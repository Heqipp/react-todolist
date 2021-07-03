import React, {Component} from 'react';

import './App.css';
//引入内容、尾部、头部组件
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Content from './components/content/content'

class App extends Component {
    constructor() {
        super()
        this.state = {
            dragIndex: '',
            enterIndex: '',
            todo: {
                list: [],
                //1.添加todo事件
                add: (item) => {
                    console.log('触发添加事件')
                    this.setState(preState => {
                        //将当前todo列表值储存到newTodo
                        let newTodo = preState.todo
                        //将当前todo列表值复制到空数组中去，并储存在变量list中
                        let list = Object.assign([], newTodo.list)
                        //为list列表添加新值
                        list.push({
                            text: item,
                            id: new Date().getTime(),
                            status: false
                        })
                        //查验新list
                        console.log(list)
                        //将改变后的list赋值给新列表
                        newTodo.list = list
                        return {
                            todo: newTodo
                        }
                    })
                },
                //2.删除todo事件
                delete: (id) => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        let list = newTodo.list.filter(item => id !== item.id)
                        newTodo.list = list
                        return {
                            todo: newTodo
                        }
                    })
                },
                //3.设置todo为已完成状态
                finish: (id) => {
                    this.setState(preState => {
                        console.log(id)
                        let newTodo = preState.todo
                        newTodo.list = newTodo.list.map(item => {
                            if(item.id === id){
                                item.status = !item.status
                            }
                            console.log(item.status)
                            return item
                        })
                        return {
                            todo: newTodo
                        }
                    })
                    console.log('触发了状态修改')
                },
                //4.一键清除todo事件
                clear: () => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        newTodo.list = []
                        return {
                            todo: newTodo
                        }
                    })
                },
                //5.编辑todo
                edit:(index,id,status)=>{
                    //console.log(index)//检验索引值
                    //console.log(this.state.todo.list)
                    //调用 setState 其实是异步的，不要指望在调用 setState 之后，this.state 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象
                    this.setState(preState => {
                        //弹出输入框，并输入值储存到变量中
                        let val = window.prompt('请输入todo内容：')
                       if(val){
                           //创建todo数据的副本
                           let newTodo = preState.todo
                           //使用splice进行数组的对象数据替换，将list数组中对应索引号index的对象的三个属性进行替换
                           newTodo.list.splice(index,1,{'text':val,'id':id,'status':status})
                           return {
                               todo: newTodo
                           }
                       }else if(val===''){
                           alert('你没有输入内容')
                       }else{

                       }
                    })
                },
                //6.拖拽
                dragstart:(index)=>{
                    console.log('dragstart运行')
                    //储存被点击节点的index值
                    this.dragIndex = index;
                    console.log('被点击的节点的index值：'+this.dragIndex)
                },
                dragenter:(e,index)=>{
                    e.preventDefault();
                    console.log('dragenter运行')
                    this.setState(preState=>{
                        if (this.dragIndex !== index) {
                            //创建todo数据的副本
                            let newTodo = preState.todo
                            //储存被点击的节点的对象数据
                            const source=newTodo.list[this.dragIndex];
                            // 避免重复触发目标对象的dragenter事件
                            if (this.enterIndex !== index) {
                                newTodo.list.splice(this.dragIndex, 1);
                                newTodo.list.splice(index, 0,source);
                                // 排序变化后目标对象的索引变成源对象的索引
                                this.dragIndex = index;
                                console.log(source)
                                return{
                                    todo:newTodo
                                }
                            } else {
                                this.enterIndex = index;
                            }
                        }
                    })

                },
                dragover:(e,index)=>{
                    e.preventDefault();
                }
            }
        }
    }

    render(){
        return(
            <div className='App'>
                {/*  父-子传参：使用todo对象把父组件的数据和方法传入子组件*/}
                <Header todo={this.state.todo}  />
                <Content todo={this.state.todo} />
                <Footer todo={this.state.todo}/>
            </div>
        )
    }
    //1.获取本地数据：生命周期函数：在组件加载完成，render() 之后调用
    componentDidMount(){
        const str = localStorage.getItem("list") || "[]";
        //获取本地存储的数据  取不到用“[]”
        //因为localStorage只能存储字符串，所以获取过来的字符串数据通过JSON.parse()变为对象形式赋值给变量list
        const locallist = JSON.parse(str);
        this.setState(preState => {
            //创建副本
            let newTodo = preState.todo
            //将本地数据赋值给副本
            newTodo.list = locallist
            return {
                //副本变真
                todo: newTodo
            }
        })
    }

    //2.储存：添加数据后会将其储存到本地
    //componentDidUpdate方法：只要页面的state或者model中的state中定义的变量值发生改变，这个方法就会执行
    componentDidUpdate(prevProps,prevState){
        //json.stringfy()将对象、数组转换成字符串
        localStorage.setItem("list",JSON.stringify(this.state.todo.list))
    }
}


export default App;

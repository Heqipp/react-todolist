import React, {Component} from 'react';

import './App.css';
//引入内容、尾部、头部组件
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Content from './components/content/content'
import moment from 'moment';

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
                        //获取此时的时间戳
                        const time=new Date().getTime()
                        //将时间戳转化为正常时间：调用转化函数
                        const id=this.timeformat(time)
                        //设置截止日期：输入字符串--转化为字符串
                        const overtime=window.prompt('请输入截止日期:格式：2021-07-04 10:45:00')
                        //为list列表添加新值
                        list.push({
                            text: item,
                            id: id,//当更新状态时，会改变此时间显示为完成时时间
                            oldtime:id,//建立时的时间：用来状态变为false时，显示建立时的时间
                            status: false,//区分正在进行和已经完成
                            dragnumb:this.state.todo.list.length,//被拖拽索引
                            overtime:overtime,//截止日期：时间
                            over:false//过期状态值:false表示未过期
                        })
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
                        let newTodo = preState.todo
                        newTodo.list = newTodo.list.map(item => {
                            if(item.id === id){
                                item.status = !item.status
                                //将截止日期的状态值设置为取反
                                item.over=!item.over
                                console.log(item.over)
                                //如果此时todo为完成状态，则更新完成时间
                                if(item.status===true){
                                    //获取当前时间为完成时的时间戳
                                    const time=new Date().getTime()
                                    //时间戳转化
                                    const newtime=this.timeformat(time)
                                    item.id=newtime
                                }else{
                                    //如果此时todo变更为未完成状态，则显示时间为建立时的时间
                                    item.id=item.oldtime
                                }
                            }
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
                edit:(index,id,status,over,oldtime,overtime,dragnumb)=>{
                    //console.log(index)//检验索引值
                    //console.log(this.state.todo.list)
                    //调用 setState 其实是异步的，不要指望在调用 setState 之后，this.state 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象
                    this.setState(preState => {
                        //弹出输入框，并输入值储存到变量中
                        let val = window.prompt('请输入todo内容：')
                       if(val){
                           //创建todo数据的副本
                           let newTodo = preState.todo
                           //使用splice进行数组的对象数据替换，将list数组中对应索引号index的对象的所有属性进行替换
                           newTodo.list.splice(index,1,{'text':val,'id':id,'status':status,'over':over,'oldtime':oldtime,'overtime':overtime,'dragnumb':dragnumb})
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
                //被拖拽开始时
                dragstart:(item)=>{
                    //储存被点击节点的index值
                    this.dragIndex = item.dragnumb;
                    console.log('被点击的todo：'+item.text)
                },
                //停止拖拽时
                dragenter:(e,item)=>{
                    e.preventDefault();//阻止浏览器默认行为
                    console.log('dragenter运行')
                    this.setState(preState=>{
                        //确认被拖拽元素和放置元素不一样
                        if (this.dragIndex !== item.dragnumb) {
                            //创建todo数据的副本
                            let newTodo = preState.todo
                            //储存被点击的节点的对象数据
                            const source=newTodo.list[this.dragIndex];
                            console.log(item)
                            if(item===''||item===false||item.length===0||item==={}||item===[]){
                                source.status=!source.status
                            }
                            // 避免重复触发目标对象的dragenter事件：防止在空白处触发拖拽事件
                            if (this.enterIndex !== item.dragnumb) {
                                //如果落下时的todo和被拖拽的todo的status不一样，则将被点击的状态值取反
                                if(item.status !== source.status){
                                    source.status=!source.status
                                }
                                //删除原位置的节点
                                newTodo.list.splice(this.dragIndex, 1);
                                //截取指定位置添加值
                                newTodo.list.splice(item.dragnumb, 0,source);
                                // 排序变化后目标对象的索引变成源对象的索引
                                console.log('鼠标落下时的todo：'+item.text)
                                this.dragIndex = item.dragnumb;
                                return{
                                    todo:newTodo
                                }
                            } else {
                                this.enterIndex = item.dragnumb;
                            }
                        }
                    })

                },
                //拖拽过程中
                dragover:(e,index)=>{
                    e.preventDefault();
                    console.log('我还在被你拽着呢')
                }
            }
        }
    }
    //7.时间戳转化为正常时间（毫秒）
    timeformat(time){
        //安装moment：import moment from 'moment';
        //解释：parseInt()把括号里面的内容转化成int类型，moment（）把括号中的内容转成时间，format（）就是把时间转化成括号里面的那种格式
        return moment(parseInt(time)).format("YYYY-MM-DD HH:mm:ss");
    }
    //8.时间转化为时间戳
    timeredution(time){
        let zTimeBegin = new Date(time)
        const timeold = zTimeBegin.getTime()
        // console.log('我已将其转化为时间戳'+timeold)
        return timeold
    }
    render(){
        return(
            <div className='App'>
                {/*  父-子传参：使用todo对象把父组件的数据和方法传入子组件*/}
                <Header todo={this.state.todo}  />
                <Content todo={this.state.todo} timeformat={this.timeformat} />
                <Footer todo={this.state.todo}/>
            </div>
        )
    }
    //截止日期对比：提醒todo过期
    tick(list){
        //输入截止日期后--转化为时间戳--储存截止时间戳到对象中--获取状态为false的所有todo对象--map将截止时间戳和当前时间比较，大于当前时间的则存入新数组中，最后后台提醒这些todo已经过期
        //获取当前时间戳
        const currenttime=new Date().getTime()
        //console.log('当前时间戳：'+currenttime)
        //遍历一遍list，将状态为fslse的取出来，之后再遍历这个结果数组，将小于当前时间项拿出来，储存到变量中
        const overtimelist=list.filter(item=>{
            // console.log('已将其滤过=false')
            return item.status===false
        }).filter(item=>{
            //将输入的日期转化为时间戳
            const overtime2=this.timeredution(item.overtime)
            return currenttime> overtime2
        }).map(item=>{ //将已经过期的状态值over设置为true
            this.setState(preState=>{
                item.over=true
                //创建todo数据的副本
                let newTodo = preState.todo
                return{
                    todo:newTodo
                }
            })
        })
        // console.log('下列todo已经过期，请注意')
        // console.log(overtimelist)
        //Web Notification消息通知的使用：浏览器API
        if(overtimelist!==false||overtimelist!==null||overtimelist.length!==0){//如果没有过期的todo，则不触发消息弹框
            Notification.requestPermission(function (permission) {new Notification('下列todo过期',{body:overtimelist})})
        }


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
        //调用计时器函数：定时器内部调用对比时间的方法:不断自检截止日期是否到期
        //如果不是定时器频繁触发，那么就不会显示过期todo的红色背景，因为触发次数太少
        setInterval(()=>this.tick(this.state.todo.list),5000);
        // this.tick(this.state.todo.list)
    }

    //2.储存：添加数据后会将其储存到本地
    //componentDidUpdate方法：只要页面的state或者model中的state中定义的变量值发生改变，这个方法就会执行
    componentDidUpdate(prevProps,prevState){
        //json.stringfy()将对象、数组转换成字符串
        localStorage.setItem("list",JSON.stringify(this.state.todo.list))
    }
}


export default App;

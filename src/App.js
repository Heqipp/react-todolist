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
                //删除todo事件
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
                //设置todo为已完成状态
                finish: (id) => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        newTodo.list = newTodo.list.map(item => {
                            item.status = !item.status
                            console.log(item.status)
                            return item
                        })
                        return {
                            todo: newTodo
                        }
                    })
                    console.log('触发了状态修改')
                },
                //一键清除todo事件
                clear: () => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        newTodo.list = []
                        return {
                            todo: newTodo
                        }
                    })
                }
            }


        }
    }


    render(){
        return(
            <div className='App'>
                {/*  父-子传参：使用todo对象把父组件的数据和方法传入子组件*/}
                <Header todo={this.state.todo}  />
                <Content todo={this.state.todo}/>
                <Footer todo={this.state.todo}/>
            </div>
        )
    }
}


export default App;

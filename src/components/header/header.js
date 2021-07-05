//头部：标题+输入框+添加按钮
import React, { Component } from 'react'

import './header.css'

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            data:''//input默认值绑定data
        }
    }
    //回车事件：按下回车后调用父组件的add事件进行todo增加
    enterPress = (event) =>{
        if(event.key === 'Enter'){
            console.log('触发回车事件')
            console.log(event.target.value)
            this.props.todo.add(event.target.value)
            event.target.value = ''
        }
    }
    //通过change监听input输入值变化，动态储存到变量title中，以便点击按钮事件的使用
    clickAdd=(event)=>{
        this.setState({
            data:event.target.value//每当输入值改变时就赋值给data储存起来
        })

    }
    //点击‘添加’按钮后，触发：将input值获取到并添加进list
    getInput=()=>{
        this.props.todo.add(this.state.data)
        //清空input输入框的值
        this.setState({data:''})
    }
    render(){
        return(
            <div className='header'>
                <div className='header-content'>
                    <div className='header-title'>Todolist</div>
                    <input className='search' placeholder="添加"  type='text' onKeyPress={this.enterPress} onChange={this.clickAdd}   ref={myInput=>this.myInput=myInput} value={this.state.data}/>
                    <button className='add' onClick={this.getInput}>添加</button>
                </div>
            </div>
        )
    }
}
export default Header


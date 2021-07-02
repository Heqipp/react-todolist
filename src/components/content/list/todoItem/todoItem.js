import React, { Component } from 'react'

import './todoItem.css'
class ToDoItem extends Component {
    //逻辑运算符：&&与：该todo的状态为‘working’，并且存在创建时间：item.id，则返回true，与当前todo的status比较

    render() {
        return (
            <div className="ToDoItem">
              {/*  选择框：onChange：点击复选框后触发父组件的finish事件；通过checked来设置复选框的选中与否（相当于计算属性效果）*/}
              <input type="checkbox" onClick={this.item.status=!this.item.status} />
              {/*渲染todo内容*/}
              <p>{this.props.item.text}</p>
              {/*删除当前todo*/}
               <span onClick={this.clickDelete}>删除</span>
                {/*显示时间*/}
                <span>{this.props.item.id}</span>
        </div>)
    }
}

export default ToDoItem

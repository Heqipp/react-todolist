//todo列表展示
import React, { Component } from 'react'

import './list.css'
import TodoItem from './todoItem/todoItem'
class List extends Component {
    render() {
        return (
            <div className='list'>
                <h2 className='list-title'>
                    {/*标题：正在进行/已经完成*/}
                    {this.props.title}
                    {/*任务数量num:filter()：创建一个新数组，基于设定条件进行删选后得到的新数组；参数二作为回调返回给函数*/}
                    {/*遍历列表中每一项的状态值status，和父组件中的status进行比对，相同则说明是‘正在进行中’*/}
                    <span className="title-numb">{this.props.todo.list.filter(item => {
                        return item.status === this.props.status
                    }).length}</span>
                </h2>
                <div>
                    {/*先使用filter过滤掉status值，然后将剩余结果渲染到‘已经完成’列表里*/}
                    {
                        this.props.todo.list.filter(item => {
                            return item.status === this.props.status
                        }).map(item => {
                            //将删选完的todo传到子组件TodoItem；并将方法、todo的id传进去
                            return <TodoItem item={item} checkboxCheck={this.props.todo.finish} key={item.id} />
                        })
                    }
                </div>
            </div>
        )
    }
}
export default List

//内容：内容列表
import React, {Component} from 'react'

import './content.css'

class Content extends Component {

    render() {
        return (
            <div className="content">
                {/* map遍历数组创建todo小li*/}
                <ul>
                    <div className='doing'>正在进行
                        {/*数量显示：使用filter基于判断条件进行过滤，然后将符合条件的todo计数length*/}
                        <span className="doing-numb">{this.props.todo.list.filter(item => {
                            return item.status === false
                        }).length}</span>
                    </div>
                    {/*过滤todo列表，找到status为false的todo，然后利用过滤的新数组进行创建元素节点*/}
                    {
                        this.props.todo.list.filter(list => {
                            return list.status === false
                        }).map((item,index) => {
                            return (
                                <div className='doing-list'>
                                    {/* 单选框被点击时触发父组件的finish方法，同时将被点击的id传进去（使用箭头函数向父组件传参）；checked用来计算属性改变单选框的选中状态*/}
                                    <input type='checkbox' className='check'
                                           onClick={() => this.props.todo.finish(item.id)} checked={item.status}/>
                                    <li key={index} >{item.text}</li>
                                    {/*编辑：调用父组件函数，并传入此todo的三个属性值：index、id、status*/}
                                    <span className='edit' onClick={()=>{this.props.todo.edit(index,item.id,item.status)}}>编辑</span>
                                    <span className='delete' onClick={() => {
                                        this.props.todo.delete(item.id)
                                    }}>删除</span>

                                </div>
                            )
                        })
                    }
                    <div className='finish'>已经完成
                        <span className="finish-numb">{this.props.todo.list.filter(item => {
                            return item.status === true
                        }).length}</span>
                    </div>

                    {
                        this.props.todo.list.filter(list => {
                            return list.status === true
                        }).map((item,index) => {
                            return (
                                <div className='finish-list'>
                                    <input type='checkbox' className='check'
                                           onClick={() => this.props.todo.finish(item.id)} checked={item.status}/>
                                    <li key={this.props.todo.list.id}>{item.text}</li>
                                    <span className='edit' onClick={()=>{this.props.todo.edit(index,item.id,item.status)}}>编辑</span>
                                    <span className='delete' onClick={() => {
                                        this.props.todo.delete(item.id)
                                    }}>删除</span>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Content

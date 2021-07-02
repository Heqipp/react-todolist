//内容：内容列表
import React, {Component} from 'react'

import './content.css'

class Content extends Component {

    render() {
        return (
            <div className="content">
                {/* map遍历数组创建todo小li*/}
                <ul>
                    <div className='doing'>正在进行</div>
                    {
                        this.props.todo.list.filter(list => {
                            return list.status === false
                        }).map((list) => {
                            return (
                                <span>
                                   <input type='checkbox' className='check' onClick={this.props.todo.finish}/>
                                   <li key={this.props.todo.list.id}>{list.text}</li>
                                   <span className='delete' onClick={this.props.todo.delete}>删除</span>
                               </span>
                            )
                        })
                    }
                    <div className='finish'>已经完成</div>
                    {
                        this.props.todo.list.filter(list => {
                            return list.status === true
                        }).map((list) => {
                            return (
                                <span>
                                   <input type='checkbox' className='check' onClick={this.props.todo.finish} checked={list.status}/>
                                   <li key={this.props.todo.list.id}>{list.text}</li>
                                   <span className='delete' onClick={this.props.todo.delete}>删除</span>
                               </span>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Content

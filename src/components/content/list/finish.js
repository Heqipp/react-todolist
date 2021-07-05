//todo列表展示
import React, { Component } from 'react'
class Doing extends Component {
    render() {
        return (
            //正在进行
            <div >
                {/*完成*/}
                <div >
                    {
                        this.props.todo.list.filter(list => {
                            return list.status === true
                        }).map((item,index) => {
                            return (
                                <div className='finish-list'
                                     draggable="true"
                                     onDragEnter={(e)=>this.props.todo.dragenter(e,item)}
                                     onDragOver={(e)=>this.props.todo.dragover(e,item)}
                                     onDragStart={(e)=>this.props.todo.dragstart(item)}
                                >
                                    <input type='checkbox' className='check'
                                           onClick={() => this.props.todo.finish(item.id)} checked={item.status}/>
                                    <li key={index}>{item.text}</li>
                                    {/*完成时间显示*/}
                                    <span className='time'>{'完成时间：'+item.id}</span>
                                    <span className='edit' onClick={()=>{this.props.todo.edit(index, item.id, item.status,item.over,item.oldtime,item.overtime,item.dragnumb)}}>编辑</span>
                                    <span className='delete' onClick={() => {
                                        this.props.todo.delete(item.id)
                                    }}>删除</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Doing

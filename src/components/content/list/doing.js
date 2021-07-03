//todo列表展示
import React, {Component} from 'react'
class Doing extends Component {

    render() {
        return (
            //正在进行
            <div>
                {/*过滤todo列表，找到status为false的todo，然后利用过滤的新数组进行创建元素节点*/}
                {
                    this.props.todo.list.filter(list => {
                        return list.status === false
                    }).map((item, index) => {
                        return (
                            //拖拽事件
                            <div className='doing-list'
                                 draggable="true"
                                 onDragEnter={(e)=>this.props.todo.dragenter(e,index)}
                                 onDragOver={(e)=>this.props.todo.dragover(e,index)}
                                 onDragStart={(e)=>this.props.todo.dragstart(index)}
                            >
                                {/* 单选框被点击时触发父组件的finish方法，同时将被点击的id传进去（使用箭头函数向父组件传参）；checked用来计算属性改变单选框的选中状态*/}
                                <input type='checkbox' className='check'
                                       onClick={() => this.props.todo.finish(item.id)} checked={item.status}/>
                                <li key={index}>
                                    {item.text}
                                </li>
                                {/*编辑：调用父组件函数，并传入此todo的三个属性值：index、id、status*/}
                                <span className='edit' onClick={() => {
                                    this.props.todo.edit(index, item.id, item.status)
                                }}>编辑</span>
                                <span className='delete' onClick={() => {
                                    this.props.todo.delete(item.id)
                                }}>删除</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Doing

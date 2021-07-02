//todo列表展示
import React, {Component} from 'react'

const maskStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgorund: "rgba(0,0,0,0.5)",
};
// 重新计算数组
const move = (arr = [], startIndex, toIndex) => {
    arr = arr.slice();
    arr.splice(toIndex, 0, arr.splice(startIndex, 1));
    return arr;
};
const lineHeight = 42;
class Doing extends Component {
    state = {
        a: 0,
        list: this.props.todo.list, // 列表的数据
        dragging: false, // 是否开始拖动
        draggingIndex: -1, // 拖动元素的下标
        startPageY: 0, // 开始拖动的 Y 轴坐标
        offsetPageY: 0 // 拖动元素的位移

    }
    // 点击的时候记录 Y 轴的位置
    dragging = (e, index) => {
        this.setState({
            dragging: true,
            draggingIndex: index,
            currentPageY: e.pageY, // 当前Y值
            startPageY: e.pageY,//起始Y值
        })
    }
    // 松开鼠标的时候，从新初始化 startPageY、draggingIndex,
    onMouseUp = (e) => {
        console.log('触发onMouseUp，开始拖动')
        this.setState({
            dragging: false,
            startPageY: 0,
            draggingIndex: -1,
        });
    };
    // 移动的轨迹
    onMouseMove = (e) => {
        console.log('触发onMouseMove，拖动过程中')
        e.preventDefault();
        let offset = e.pageY - this.state.startPageY;
        const draggingIndex = this.state.draggingIndex;
        if (offset > lineHeight && draggingIndex < this.state.list.length) {
            //  向下移动
            offset -= lineHeight;
            // move 期间，state 的数据是动态变化的，draggingIndex 始终比上一个多 1
            this.setState({
                list: move(this.state.list, draggingIndex, draggingIndex + 1), // 按照移动的方向进行数据交换
                draggingIndex: draggingIndex + 1,
                startPageY: this.state.startPageY + lineHeight,
            });
        } else if (offset < -lineHeight && draggingIndex > 0) {
            // 向上移动
            offset += lineHeight;
            this.setState({
                list: move(this.state.list, draggingIndex, draggingIndex - 1),
                draggingIndex: draggingIndex - 1,
                startPageY: this.state.startPageY - lineHeight,
            });
        }
        // item 移动的距离
        this.setState({offsetPageY: offset});
    };
    // 移动动画
    getDraggingStyle = (index) => {
        if (index !== this.state.draggingIndex) return;
        return {
            backgorundColor: "#eee",
            transform: `translate(10px,${this.state.offsetPageY}px)`,
            opacity: 0.5,
        };
    };

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
                                 onMouseDown={(e) => this.dragging(e, index)}
                                 style={this.getDraggingStyle(index)}
                            >
                                {/* 单选框被点击时触发父组件的finish方法，同时将被点击的id传进去（使用箭头函数向父组件传参）；checked用来计算属性改变单选框的选中状态*/}
                                <input type='checkbox' className='check'
                                       onClick={() => this.props.todo.finish(item.id)} checked={item.status}/>
                                <li key={index}>
                                    {item.text}
                                </li>
                                {/* 用一个遮罩监听事件，也可以监听整个 document */}
                                {this.state.dragging && (
                                    <div
                                        style={maskStyle}
                                        onMouseUp={(e) => this.onMouseUp(e)}
                                        onMouseMove={(e) => this.onMouseMove(e)}
                                    />
                                )}

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

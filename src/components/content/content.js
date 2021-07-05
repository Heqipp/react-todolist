//内容：内容列表
import React, {Component} from 'react'

import './content.css'
import Doing from './list/doing'
import Finish from './list/finish'
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
                    {/*调用子组件：进行中list*/}
                    <Doing todo={this.props.todo} timeformat={this.props.timeformat}/>
                    <div className='finish'>已经完成
                        <span className="finish-numb">{this.props.todo.list.filter(item => {
                            return item.status === true
                        }).length}</span>
                    </div>
                    {/*调用子组件：完成list*/}
                    <Finish todo={this.props.todo}/>
                </ul>
            </div>
        )
    }
}

export default Content

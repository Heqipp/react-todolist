//内容：内容列表
import React, { Component } from 'react'

import './content.css'
import List from './list/list'
class Content extends Component{
    render(){
        return(
            <div className="content">
                <List title="正在进行" todo={this.props.todo} status="working"/>
                <List title="已经完成" todo={this.props.todo} status="finished"/>
            </div>
        )
    }
}
export default Content

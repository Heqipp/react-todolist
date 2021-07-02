//尾部：版权信息+清空全部列表按钮
import React, { Component } from 'react'

import './footer.css'

class Footer extends Component{
    render(){
        return(
            <div className= 'footer' onClick={this.props.todo.clear}>一键清空</div>
        )
    }
}
export default Footer


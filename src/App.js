import React,{Component} from 'react';

import './App.css';
//引入内容、尾部、头部组件
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Content from './components/content/content'

class App extends Component {
    constructor() {
        super()
        this.state = {
            todo: {
                list: [],
                //1.添加todo事件
                add: (item) => {
                    console.log('触发添加事件')
                    this.setState(preState => {
                        //将当前todo列表值储存到newTodo
                        let newTodo = preState.todo
                        //将当前todo列表值复制到空数组中去，并储存在变量list中
                        let list = Object.assign([], newTodo.list)
                        //为list列表添加新值
                        list.push({
                            text: item,
                            id: new Date().getTime(),
                            status: 'working'
                        })
                        //将改变后的list赋值给新列表
                        newTodo.list = list
                        return {
                            todo: newTodo
                        }
                    })
                },
                //删除todo事件
                delete: (id) => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        let list = newTodo.list.filter(item => id !== item.id)
                        newTodo.list = list
                        return {
                            todo: newTodo
                        }
                    })
                },
                //设置todo为已完成状态
                finish: (id) => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        let list = newTodo.list.map(item => {
                            if(item.id === id) {
                                item.status = 'finished'
                            }
                            return item
                        })
                        newTodo.list = list
                        return {
                            todo: newTodo
                        }
                    })
                    console.log('触发了状态修改')
                },
                //一键清除todo事件
                clear: () => {
                    this.setState(preState => {
                        let newTodo = preState.todo
                        newTodo.list = []
                        return {
                            todo: newTodo
                        }
                    })
                }
            }


            }
        }


  render(){
    return(
        <div className='App'>
          {/*  父-子传参：使用todo对象把父组件的数据和方法传入子组件*/}
          <Header todo={this.state.todo}  />
          <Content todo={this.state.todo}/>
          <Footer todo={this.state.todo}/>
        </div>
    )
  }
}


export default App;

//笔记：
//1.使用className来命名css名称而不用class,是因为class是JS中的保留字
//2.使用中括号来为节点添加属性:{}
//3.不使用createElement创建元素而使用JSX（JavaScript XML）的原因：因为前者结构不直观、难辨识；而jsx更加还原了html的结构书写，可以在html中混入书写js语法
//JSX语法：const title=<h1>内容</h1><span>内容2</span>；将html结构赋予到变量title中，实现html和JS的混合使用
//4.JSX语法并不是官方的，是扩展出来的，我们不需要下载就能使用，是因为脚手架自己内部已经帮我们下载完毕jsx的语法配置了
//5.语法简化：<span><span>=<span/>
//6.jsx中使用js：花括号{}内部写JS语法：效果相当于Matcher语法{{变量}}：调用括号内变量代表的内容；<p>{1+7}<p>输出为8
//7.函数式创建组件：function App(){return ()};名称第一个大写App；组件必须有返回值return（返回值表示是组件的结构）
//8.如何渲染函数式组件？ReactDOM.render(<App/>,root)；直接使用函数名作为标签名；类创建组件的渲染方法一样
//9.类创建组件：class TodoItem extends Component{ render(){ return() }};驼峰命名；extends后面跟父类名称，继承其方法和属性；必须有render和return
//10.每个组件文件.js都需要导入React文件：import React from 'react'
//11.事件绑定：类组件中：on+事件名称（事件名称为驼峰命名）={this.方法名称}；方法写在render()外面 //函数式组件中：不写this+方法写在return()外面：写法：function handleClick(){console.log('')}
//12.有状态组件（类组件）和无状态组件（函数式组件）：当需要数据变化时（计数器数据0-99的增加）需要使用类组件，静态数据的展示使用函数式组件
//13.推荐将props作为参数传入constructor，这样父子组件传参就能在constructor中实现；render中调用参数时使用this.props即可使用值；props是只读的，无法在其他组件修改其值

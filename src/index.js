import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//ReactDOM.render(参数一,参数二)作用是将模板转为HTML语言，并插入指定的DOM节点。参数一：要被渲染的react元素；参数二：插入模板的目标位置
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();

//笔记：
//使用React脚手架创建项目:目录下执行npx create-react-app todolist(项目英文名),见到Happy hacking即创建成功;
//启动项目:npm start
//npx命令作用：无需安装脚手架包，便可使用脚手架命令；create-react-app是脚手架名字（固定）；


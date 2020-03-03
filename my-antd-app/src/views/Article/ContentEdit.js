import React, { Component, createRef } from 'react';
import { Button } from 'antd'
import E from 'wangeditor';



export default class ContentEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.value
        }
        this.editorElem = createRef()
    }

    initEdit = () => {

        // const elem = this.refs.editorElem; //获取editorElem盒子
        // const submit = this.refs.submit; //获取提交按钮

        this.editor = new E(this.editorElem.current)  //new 一个 editorElem富文本
        const editor = this.editor;
        editor.customConfig.zIndex = 100;
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]

        // editor.customConfig.pasteTextHandle = function (content) {
        //     // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        //     return content + '<p>在粘贴内容后面追加一行</p>'
        // }
        this.editor.create() 
        editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            // console.log(html)
            this.props.onChange(html)
            
        }
        editor.create() //创建应该在方法后面 否则无法实现方法
      
        editor.txt.html(this.props.value)  //设置富文本默认内容

       

    }


    componentDidMount() {

        this.initEdit();
        this.editor.txt.html(this.props.value)
    }
    // onSetContent=()=>{
    //     console.log(this.editor)
    //     this.editor.txt.html(this.props.value2)
    // }

    shouldComponentUpdate(nextProps) {
        const update = nextProps.value !== this.props.value;
        // console.log("2", update,nextProps.value,this.props.value)
        if (update)  //确认是否更新
            this.editor.txt.html(nextProps.value)
        return update
    }


    render() {

        return (
            <div className="contentEditor" >
                <div ref={this.editorElem}></div>

            </div>
        )
    }
}

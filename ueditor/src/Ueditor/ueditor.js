import React from 'react';

export default class Ueditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : null,
            ueditor: null,
            content: this.props.content
        }
    }
    componentDidMount() {
        const UE = window.UE;
        const { id } = this.state;
        if (id) {
            try {
                /*加载之前先执行删除操作，否则如果存在页面切换，
                再切回带编辑器页面重新加载时不刷新无法渲染出编辑器*/
                UE.delEditor(id);
            } catch (e) { }
            this.ueditor = UE.getEditor(id, {
                autoHeightEnabled: true,
                autoFloatEnabled: true
                //启用自动保存 
                , enableAutoSave: true
                //自动保存间隔时间， 单位ms 
                , saveInterval: 500 * 60 * 60
            });

            this.ueditor.ready(() => {

                var value = this.state.content ? this.state.content : "<p>初始化没有内容,默认添加内容,不能实现图片插入</p>"

                //设置编辑器的内容
                this.ueditor.setContent(value);
                //获取html内容，返回: <p>hello</p>
                // var html = this.ueditor.getContent();
                // //获取纯文本内容，返回: hello
                // var txt = this.ueditor.getContentTxt();


                this.ueditor.addListener('afterSelectionChange', () => {
                    //获取html内容 
                    var html = this.ueditor.getContent();
                    this.props.onGetContent(html);
                })


            });

            console.log(this.ueditor)


            // this.setState({ ueditor: this.ueditor });
        }
    }


    shouldComponentUpdate(nexProps) {

        if (nexProps !== this.props) {
            // console.log(nexProps.content)
            this.ueditor.setContent(nexProps.content);
        }
        return nexProps !== this.props;
    }

    componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        this.ueditor.delEditor(this.props.id);
    }

    render() {
        let { id } = this.state;
        console.log(this.state)
        return (
            <div>
                <textarea id={id} />
            </div>
        );
    }
}
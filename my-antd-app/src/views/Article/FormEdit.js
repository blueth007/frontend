import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, message, Spin } from 'antd';
import moment from 'moment'
import ContentEdit from './ContentEdit'
import { getOneArticle, setArticle } from '../../requests';
import { withRouter } from 'react-router-dom'


@withRouter
@Form.create()
class FromLists extends Component {
    state = {
        spinLoading: false
        // data: {
        //     title: "",
        //     author: "",
        //     amount: "",
        //     createAt: null,
        //     content: ""
        // }
    }


    componentDidMount() {
        const id = this.props.match.params.id
        // console.log(id);
        getOneArticle(id).then(res => {
            if (res.code === "200") {
                // console.log(res.data)
                // this.setState({
                //     data: res.data
                // }, () => {})
                const { title, content, createAt, author, amount } = res.data;
                this.props.form.setFieldsValue({
                    content,
                    title,
                    author,
                    amount,
                    createAt: moment(createAt),
                })


            } else {
                message.loading({ content: "Loading..." });
                setTimeout(() => {
                    message.error("this is wrong !");
                }, 1000);
            }
        })
    }


    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            spinLoading:true
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.createAt = moment(values.createAt).valueOf()
                const id = this.props.match.params.id;
                console.log('Received values of form: ', values);
                setTimeout(
                    ()=>{
                        setArticle(id, values).then(resp => {

                            if (resp.code === "200") {
                                console.log(resp)
                              message.success("保存成功");
                              this.props.history.push("/admin/article")
                            }
                            else {
                                message.loading({ content: "Loading..." });
                                setTimeout(() => {
                                    message.error("this is wrong !");
                                }, 1000);
                            }
                        })
                    },5000   //延迟5S看
                )
            }
        });
    };





    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <Spin spinning={this.state.spinLoading} delay={500}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>


                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者' }],

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="阅读量">
                        {getFieldDecorator('amount', {
                            rules: [{ required: true, message: '请输入阅读量', type: 'number', },],

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="发布时间">
                        {getFieldDecorator('createAt', {
                            rules: [{ required: true, message: '请输修改时间' }],
                            initialValue: null

                        })(<DatePicker showTime placeholder="选择时间" />)}
                    </Form.Item>
                    <Form.Item label="文章正文"
                        wrapperCol={{
                            span: 18
                        }}
                    >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '内容不能为空' }],
                            // initialValue: "<div>初始值</div>",
                            getValueFromEvent: (content) => {  //可以把 onChange 的参数（如 event）转化为控件的值
                                // console.log(divContent)    //获取到的 ContentEdit 里面的值
                                return content
                            },


                        }


                        )(<ContentEdit /*value2={data.content}*/ />)}   {/*默认会在控件中添加属性 props value onChange */}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 12, offset: 6 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
  </Button>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}



export default FromLists
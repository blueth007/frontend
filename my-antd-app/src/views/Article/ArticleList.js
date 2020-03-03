import React, { Component } from "react";
import {
    Card,
    Button,
    Table,
    message,
    Tag,
    Modal,
    Tooltip,
} from "antd";
import { withRouter } from 'react-router-dom'
import { getData, deletedArticle } from "../../requests";
import XLSX from "xlsx"; //toExcel

export default class ArticleList extends Component {
    render() {
        return (
            <div className="articleList">
                <TableList />
            </div>
        );
    }
}

const ColumnesTitleMap = {
    id: "ID",
    title: "标题",
    author: "作者",
    amount: "阅读量",
    createAt: "创建时间"
};
@withRouter
class TableList extends Component {
    state = {
        dataSource: [], // Check here to configure the default column
        columns: [],
        isLoading: false,
        page: 1, //当前页
        pageSize: 10, //每页显示数量
        total: 10,
        modalVisible: false, //显示删除的确认框
        confirmLoading: false,
        deletedArticleItem: {}
    };

    creatColumns = columnsKey => {
        var columns = columnsKey.map(item => {
            if (item === "id") {
                return {
                    title: "序号",
                    render: (text, record, index) =>
                        `${(this.state.page - 1) * this.state.pageSize + (index + 1)}`, //当前页数减1乘以每一页页数再加当前页序号+1,
                    key: item
                };
            }
            if (item === "amount") {
                return {
                    title: ColumnesTitleMap[item],
                    render: (text, record, index) => (
                        <Tooltip title={record.amount > 350 ? "hot" : "popular"} overlayStyle={{ background: "transparent" }}>
                            <Tag color={record.amount > 350 ? "red" : "green"}>
                                {record.amount}
                            </Tag>
                        </Tooltip>
                    ),
                    key: item
                };
            }

            if (item === "createAt") {
                return {
                    title: ColumnesTitleMap[item],
                    render: (text, record, index) => {
                        // const date=new Date(record.createAt)
                        // console.log(date.toLocaleDateString(),date.toLocaleTimeString())
                        return (
                            <span>{new Date(record.createAt).toLocaleDateString()}</span>
                        );
                    },
                    key: item
                };
            }
            return {
                title: ColumnesTitleMap[item],
                dataIndex: item,
                key: item
            };
        });

        columns.push({
            title: "操作",
            render: record => (
                <Button.Group>
                    <Button
                        type="primary"
                        size="small"
                        onClick={this.editArticle.bind(this,record)}
                    >
                        编辑
          </Button>
                    <Button
                        type="waring"
                        size="small"
                        onClick={this.showModal.bind(this, record)}
                    >
                        删除
          </Button>
                </Button.Group>
            ),
            key: "action"
        });
        return columns;
    };

    //获取服务器数据
    fetchData = () => {
        this.setState({
            isLoading: true
        });
        getData().then(data => {
            // console.log(data);
            if (data.code === "200") {
                const { lists, total } = data.data;
                const columnsKey = Object.keys(lists[0]);
                const columns = this.creatColumns(columnsKey);
                //console.log(columnsKey,lists);
                //数据处理新增数据
                /**
                 *  注意 lists 长度 ≠ defaultPageSize 则第一次传输数据会造成分页只有lists 的所有数据,分页后面没有多余数据
                 *   修改 this.state.pageSize 和后端 发送数据数量 可以测试
                 *
                 *
                 */
                const n = lists.length;
                if (n < this.state.pageSize) {
                    for (let i = 0; i < this.state.pageSize - n; i++) {
                        lists.push({
                            id: `${Math.random() * 100}`,
                            title: `${"NewItem " + i}`,
                            author: "newAuthor",
                            amount: 1561,
                            createAt: 1495697456310
                        });
                    }
                }

                this.setState({
                    dataSource: lists,
                    total: total,
                    isLoading: false,
                    columns
                });
            } else {
                message.loading({ content: "Loading..." });
                setTimeout(() => {
                    message.error("this is wrong !");
                }, 1000);
            }
        });
    };

    componentDidMount() {
        this.fetchData();
    }

    //调用分页
    /**
     *    注意: 如果获取到的数据 和默认分页数据的差异
     *
     *
     *
     */

    pageChange = (page, pageSize) => {
        console.log({ page, pageSize });
        this.setState(
            {
                pageSize,
                page
            },
            () => this.fetchData()
        );
        //会渲染2次 state 改变 和 fetch 再次 state 涉及到是否Loading 所以渲染比较频繁
    };

    sizeChange = (current, size) => {
        console.log({ current, size });
        this.setState(
            {
                page: 1,
                pageSize: size
            },
            () => this.fetchData()
        );
    };

    //前端转换为excel,最好是向后端请求数据 做成exce
    toExcel = () => {
        console.log("toExcel");

        var data = [[]];
        data[0] = Object.keys(this.state.dataSource[0]).map(
            a => ColumnesTitleMap[a]
        );
        for (let b in this.state.dataSource) {
            const dt = this.state.dataSource[b];

            data.push([
                dt.id,
                dt.title,
                dt.author,
                dt.amount,
                new Date(dt.createAt).toLocaleString()
            ]);
        }

        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(data); //data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `sheetjs-${Math.random() * 100}.xlsx`);
    };

    //删除数据
    handleDeleted = () => {
        deletedArticle(this.state.deletedArticleItem.id).then(res => {
            console.log(res);
            setTimeout(() => {
                //删除后 重新请求数据,页面也需要重新到第一个

                this.setState(
                    {
                        modalVisible: false,
                        confirmLoading: false,
                        page: 1
                    },
                    () => {
                        this.fetchData();
                        message.info(res.data.msg);
                    }
                );
            }, 2000);
        });
    };

    //编辑
    editArticle = (record) => {
        console.log(record);
        this.props.history.push(`/admin/article/edit/${record.id}`) //跳转到编辑页面
    }


    //不能异步操作
    // Modal.confirm({
    //     title: "请仔细确认是否删除",
    //     content: <div>
    //         <h3>{record.title}</h3>
    //         <p style={{color:'red'}}>删除数据不可恢复,请慎重</p>
    //     </div>,
    //     onOk:()=>{
    //         console.log(record.id);
    //     }
    // })

    //显示Modal 对话框
    showModal = record => {
        console.log(record);
        this.setState({
            modalVisible: true,
            deletedArticleItem: record
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });

        this.handleDeleted();
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    };

    render() {
        const {
            columns,
            dataSource,
            total,
            isLoading,
            page,
            pageSize,
            modalVisible,
            confirmLoading,
            deletedArticleItem
        } = this.state;
        return (
            <Card
                title="文章列表"
                extra={<Button onClick={this.toExcel}>导出EXcel</Button>}
                style={{ width: "100%" }}
            >
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={dataSource}
                    loading={isLoading}
                    //数据分页
                    pagination={{
                        total: total,
                        current: page,
                        defaultPageSize: pageSize,
                        hideOnSinglePage: true, //隐藏单页
                        showQuickJumper: true,
                        showSizeChanger: true, //显示每页多少个
                        onChange: this.pageChange,
                        onShowSizeChange: this.sizeChange
                    }}
                />
                <Modal
                    title={<h1 style={{ color: "red", textAlign: "center" }}>删除</h1>}
                    visible={modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>确定删除: {deletedArticleItem.title} ?</p>
                    <h3>删除后不可撤销!!!!</h3>
                </Modal>
            </Card>
        );
    }
}


// TableList = withRouter(TableList);
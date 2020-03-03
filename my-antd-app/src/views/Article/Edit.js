import React, { Component } from "react";
import { Card, Button, } from "antd";
import FromLists from './FormEdit';



class ArticleEdit extends Component {
    render() {
        return (
            <Card
                title="文章编辑"
                extra={
                    <Button>
                        <a href="/admin/article">取消</a>
                    </Button>
                }
                style={{ width: "100%" }}
            >
                <FromLists />
            </Card>
        );
    }
}



export default ArticleEdit
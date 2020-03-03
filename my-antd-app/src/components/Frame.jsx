import { Layout, Menu, Breadcrumb, Icon } from "antd";
import React from "react";
import logo from "./logo.png";
import {   withRouter } from "react-router-dom";

 
const { Header, Content, Sider } = Layout;

@withRouter   //要报错
class Frame extends React.Component {
  handleClickMenu = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    const props = this.props;
    // console.log(props);
    const url = props.location.pathname.slice(1).replace(/\//g, ' / ');  //获取 pathname 加空格
    const breadcrumbItems = <Breadcrumb.Item key={url}>
      {url}
    </Breadcrumb.Item>

    const selectMenu = props.location.pathname.split("/").slice(0, 3).join("/"); //需要重新定义截取路径的长度
    // console.log(selectMenu)
    return (
      <Layout>
        <Header className="header" style={{ backgroundColor: "#fff" }}>
          <div className="logo">
            <img src={logo} alt="LOGO" height="50px" />{" "}
          </div>

        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectMenu]}  //需要重新定义截取路径的长度
              selectedKeys={[selectMenu]}
              onClick={this.handleClickMenu}
              style={{ height: "100%", borderRight: 0 }}
            >
              {props.menus.map(m => (
                <Menu.Item key={m.pathname}>
                  <span>
                    <Icon type={m.icon} />
                    {/* <Link to={m.pathname}>{m.title}</Link> */}
                    {m.title}
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


export default Frame;
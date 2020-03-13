import React from 'react'
import { Layout, Row, Col } from 'antd'

import './App.css'
import { Spinner, Sider, Product, Cart } from "./components"


function App(props) {

  return (
    <Layout className="App">
      <Row>
        <Col xs={24} sm={6} md={6} lg={6} xl={6}  >
          <Sider />
        </Col>
        <Col xs={24} sm={18} md={18} lg={18} xl={18}  >
          <Product />
        </Col>
      </Row>
      {/* <Spinner /> */}
      {/* <Cart /> */}
    </Layout>
  )
}

export default App

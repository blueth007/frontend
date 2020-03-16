import React, { Component } from "react";
import { List,  Button } from "antd";
import { connect } from "react-redux";
// import { deleteToCart, increase, decrease } from "../../action/action";
import { deleteToCart, increase, decrease } from "../../action/newAction";

class ListItem extends Component {
  render() {
    return (
   
        <List
          style={{ color: "white" }}
          itemLayout="horizontal"
          dataSource={this.props.lists}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div className="cart_avatar">
                    <img src={`./images/products/${item.sku}_2.jpg`}  alt={item.title}/>
                  </div>
                }
                title={<span>{item.title}</span>}
                description={
                  <>
                    <p>{item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                  </>
                }
              />
              <div className="control">
                <p>
                  {" "}
                  {item.currencyFormat} <strong>{parseInt(item.price)}</strong>.
                  {(item.price * 100) % 100}
                </p>
                <p>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.props.dispatch(decrease(item.id));
                    }}
                  >
                    -
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.props.dispatch(increase(item.id));
                    }}
                  >
                    +
                  </Button>
                </p>
              </div>
              <div
                className="closed_cart"
                onClick={() => {
                  this.props.dispatch(deleteToCart(item.id));
                }}
              >
                X
              </div>
            </List.Item>
          )}
        />
     
    );
  }
}

export default connect()(ListItem);

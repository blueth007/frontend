import React, { Component } from "react";
import "./index.scss";
import ListItem from "./ListItem";
import {connect} from 'react-redux'


 class FloatCart extends Component {

  render() {
    const { lists } = this.props;
    var quantity = 0,subtotal=0;
    lists.map(it => { 
      quantity += it.quantity;
    });
 
    return (
      <div className="cart">
        <input type="checkbox" name="cartIcon" id="cartCheck" />
        <div className="cart-content">
          <div className="cartIcon">
            <span style={{ position: "relative" }}>
              <img src="./images/bag-icon.png" alt="cartIcon" />
              <span className="quantity">{quantity}</span>
            </span>
            <strong className="cartTitle">Cart</strong>
          </div>
          <div className="cartlist">
            <ul>
              {lists.map(item => (
                <ListItem
                  item={item}
                  key={item.id}
                  onDecrease={this.handleDecrease}
                  onIncrease={this.handleIncrease}
                  onClosed={this.handleClosed}
                />
              ))}
            </ul>
            <div className="listItem-total">
              <p>
                subtotal
                <span>
                  $ <span>{subtotal}</span>
                </span>
              </p>
              <div className="checkout">
                <button onClick={this.handleCheckOut}>CHECK OUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="closed"></div>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  lists:state.cartList
})


export default   connect(mapStateToProps)(FloatCart) 
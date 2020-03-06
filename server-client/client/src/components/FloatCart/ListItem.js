import React, { Component } from "react";
import { decreaseCart } from "../../action/action";
import { connect } from "react-redux";

class ListItem extends Component {

  hanleClosed = id => {
    this.props.onClosed(id);
  };
  handleDecrease = id => {


    this.props.onDecrease(id);
  };
  handleIncrease = id => {

    this.props.onIncrease(id);
  };

  //多个渲染 使用redux 
  shouldComponentUpdate(newProps, newState) {
    // console.log('  UPDATE!',newProps.item.quantity,this.props.item.quantity)
    return true;
  }

  render() {
    // const { closed, num } = this.state;
    const { item } = this.props;
    // console.log(this.props);
    console.log("Item Render")
    return (

      <li className="list-item">
        <img src={`./images/products/${item.sku}_2.jpg`} />
        <div className="listItem-desc">
          <h3>{item.title}</h3>
          <p>
            {item.currencyFormat} | {item.style}
          </p>
          <p>
            Quantity:&nbsp;<span>{item.quantity} </span>
          </p>
        </div>
        <div className="listItem-price">
          <p>
            {item.currencyFormat} {item.price.toFixed(2)}
          </p>
          <p>
            <button onClick={this.handleDecrease.bind(this, item.id)}>
              -
              </button>
            <button onClick={this.handleIncrease.bind(this, item.id)}>
              +
              </button>
          </p>
        </div>
        <div
          className="listItem-closed"
          onClick={() => this.props.onClosed(item.id)}
        >
          X
          </div>
      </li>

    );
  }
}

const mapDispatch = dispatch => ({
  onClosed: (item) => dispatch(decreaseCart(item))
})

export default connect(null, mapDispatch)(ListItem)  

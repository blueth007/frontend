import React, { Component } from "react";
import { Card  } from "antd";
import { connect } from "react-redux";
// import { addToCart} from '../../action/action'
import { addToCart} from '../../action/newAction'

/*  item:
{
  id: 12
  sku: 12064273040195392
  title: "Cat Tee Black T-Shirt"
  description: "4 MSL"
  availableSizes: (2) ["S", "XS"]
  style: "Black with custom print"
  price: 10.9
  installments: 9
  currencyId: "USD"
  currencyFormat: "$"
  isFreeShipping: true
}

*/

 class productItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <Card
        hoverable
        // style={{ width: 140}}
        cover={
          <img alt="example" src={`./images/products/${item.sku}_1.jpg`} />
        }
      >
        <Card.Meta
          title={item.title}
          description={
            <>
              <div className="product_price">
                {item.currencyFormat} <strong>{parseInt(item.price)}</strong>.
                {(item.price * 100) % 100}
              </div>
              <span>
                or {item.installments} X {item.currencyFormat}{" "}
                {(item.price / item.installments).toFixed(2)}
              </span>
            </>
          }
        />
        <h2>
          <button onClick={()=>{
            this.props.dispatch(addToCart(item.id))
          }}>Add Cart</button>
        </h2>
      </Card>
    );
  }
}

export default connect()(productItem)   
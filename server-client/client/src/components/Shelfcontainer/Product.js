import React, { Component } from "react";
import{connect}from 'react-redux'
import { addCart} from "../../action/action"

 class Product extends Component {

  handleAdd(product){
    //console.log(product);
    this.props.addToCart(product)
  }

  render() {
    const { product } = this.props;
    product.quantity=1;
  

    return (
      <div className="productItem" data-sku={product.sku}>
        <img
          src={`./images/products/${product.sku}_1.jpg`}
          alt={product.title}
          title={product.title}
        />
        <p className="titleItem">{product.title}</p>

        <div className="priceItem">
          <span>{product.currencyFormat} </span>
          <strong>{product.price.toFixed(2)}</strong>
          <div className="installmentsItem">
          or{" "}
          <span>
            {product.installments} × {product.currencyFormat}{" "}
            {(product.price / product.installments).toFixed(3)}
          </span>
        </div>
        </div>
        
        <div className="addCartItem" onClick={()=>this.handleAdd(product)}>Add Cart</div>

        <div className="descriptionItem">{product.description}</div>

        {product.isFreeShipping ? (
          <div className="isFreeShippingItem">Free Shipping</div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>({
  addToCart:(product)=>dispatch(addCart(product))
})


export default connect(null,mapDispatchToProps)(Product);
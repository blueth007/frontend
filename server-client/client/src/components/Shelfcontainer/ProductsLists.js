import React, { Component } from 'react'
import Product from './Product';


export default class ProductsLists extends Component {

    
  shouldComponentUpdate(NextProps) {
    console.log("update: ", NextProps.lists, this.props.lists);
    return NextProps.lists !== this.props.lists;
  }
  render() {
    var { lists } = this.props;
  
    return (
      <div className="productsLists">

        {
          lists.map(pdt => <Product key={pdt.id} product={pdt} />)
        }

      </div>
    )
  }
}

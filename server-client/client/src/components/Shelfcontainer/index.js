import React, { Component } from "react";
import ProductsLists from "./ProductsLists";
import { connect } from "react-redux";
import { SelectFilters, selectOrderBy } from "../../action/action";

import "./index.scss";

class Container extends Component {

  shouldComponentUpdate(NextProps) {
   // console.log("update: ", NextProps.lists, this.props.lists);
    return NextProps.lists.length !== this.props.lists.length;
  }

  render() {
    console.log(this.props.lists);

    return (
      <div className="shelfContainer">
        <ContainerHeader length={this.props.lists.length} />
        <ProductsLists lists={this.props.lists} />
      </div>
    );
  }
}

function ContainerHeader(props) {
  return (
    <div className="containerheader">
      <span>{props.length} Product(s) found</span>
      <Sort />
    </div>
  );
}

function SortConponent(props) {
  return (
    <div className="sort">
      Order by:
      <select onChange={e => props.onChange(e.target.value.toUpperCase())}>
        <option value="select">select</option>
        <option value="lowestprice">Lowest to highest</option>
        <option value="highestprice">Highest to lowest</option>
      </select>
    </div>
  );
}

// 过滤数组
const setlists = (state = [], filter) => {
  // console.log(state, filter);
  switch (filter) {
    case SelectFilters.SELECT:
      return state.sort((a, b) => a.id - b.id);
    case SelectFilters.HIGHESTPRICE:
      return state.sort((a, b) => b.price - a.price);
    case SelectFilters.LOWESTPRICE:
      return state.sort((a, b) => a.price - b.price);
    default:
      return state;
  }
};

const mapStateToProps = state => {
  return {
    lists: state.lists 
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: value => {
    dispatch(selectOrderBy(value));
  }
});

export default connect(mapStateToProps)(Container);

const Sort = connect(null, mapDispatchToProps)(SortConponent);

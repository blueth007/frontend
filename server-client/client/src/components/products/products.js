import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { Row, Col, Select } from "antd";
import Spinner from "../Spinner";
import ProductItem from "./productItem";
import {
  SelectFilters,
  selectFilter,
  fetchPostsIfNeeded,
  fetchData,
  filterLsits,
  isGetSameValue
} from "../../action/newAction";

const { Option } = Select;

class Products extends Component {
  componentDidMount() {
    this.props.onFetchchData();
  }

  render() {
    const { lists, onChange } = this.props;
    // console.log(lists);
    // const sortlists = sortArr(lists.products, selectByOrder);

    return lists.isFetching ? (
      <Spinner />
    ) : (
      <div>
        <Row gutter={[24, 12]}>
          <Col xs={24} sm={24} md={12}>
            {lists.products.length} products is found
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Row>
              <Col sm={24} lg={{ span: 18, offset: 6 }}>
                <SortConponent onChange={onChange} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[{ xs: 8, sm: 16, md: 18, lg: 24 }, 18]}>
          {lists.products.map((item, index) => (
            <Col
              className="gutter-row"
              key={index}
              xs={12}
              sm={12}
              md={8}
              lg={6}
            >
              <ProductItem item={item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

function SortConponent(props) {
  return (
    <div className="sort">
      Order by:
      <Select
        defaultValue="select"
        style={{ width: "170px" }}
        onChange={props.onChange}
      >
        <Option value="select">select</Option>
        <Option value="lowestprice">Lowest to highest</Option>
        <Option value="highestprice">Highest to lowest</Option>
      </Select>
    </div>
  );
}

const mapStateToProps = state => {
  const { lists, checkedSize, selectByOrder } = state;

  if (JSON.stringify(lists) === "{}" || lists.isFetching)
    return {
      lists: {
        isFetching: true,
        products: []
      },
      selectByOrder
    };
  // console.log(lists)
  return {
    lists: {
      isFetching: false,
      products: filterLsits(lists.products, checkedSize)
    },
    selectByOrder
  };
};
//  ********** 改版后state******************
const mapDispatchToPropsNew = state => {
  const { sortOrder, availableSizes, items, isFetching } = state.products;

  if (JSON.stringify(state.products) === "{}" || isFetching)
    return {
      lists: {
        isFetching: true,
        products: []
      }
    };

  return {
    lists: {
      isFetching,
      products: sortOrder
        .filter(it => isGetSameValue(availableSizes[it], state.checkedSize))   //过滤数组有相同size的
        .map(it => {          //添加详细
          return items[it];
        })
        .sort((a, b) => {       //排序
          switch (state.orderSelect) {
            case SelectFilters.SELECT:
              return a.id - b.id;
            case SelectFilters.LOWESTPRICE:
              return a.price - b.price;
            case SelectFilters.HIGHESTPRICE:
              return b.price - a.price;
            default:
              return false;
          }
        })
    }
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(selectFilter(value.toUpperCase())),
  onFetchchData: () => dispatch(fetchData())
  ///*或者使用判断刷新 */ onFetchchData: () => dispatch(fetchPostsIfNeeded())
});

export default connect(mapDispatchToPropsNew, mapDispatchToProps)(Products);

/********************  重新设计state 多路复用,根据key来划分结构 *********/

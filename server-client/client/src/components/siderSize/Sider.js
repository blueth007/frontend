import React, { Component } from 'react'
import { Checkbox, Row, Col } from 'antd'
import './index.scss'
import { connect } from 'react-redux';
// import{checkboxSelect} from  '../../action/action';
import{selectSize} from  '../../action/newAction';

const plainOptions = ["XS","S", "M", "X","L","ML","XL", "XXL"];
class Sider extends Component {


    onChange = (checkedValues) => {
        // console.log('checked = ', checkedValues);
        this.props.ChangeChecked(checkedValues);
    }
    render() {

        const { checkedSize } = this.props
        // console.log(checkedSize)
        return (
            <div className="filterSize">
                <h3>Size:</h3>
                <Checkbox.Group onChange={this.onChange}  defaultValue={checkedSize}>
                    <Row>
                        {
                            plainOptions.map(ck => <Col key={ck} lg={6} md={8} sm={12} xs={4}>
                                <Checkbox value={ck} >{ck}</Checkbox>
                            </Col>)
                        }
                    </Row>
                </Checkbox.Group>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    checkedSize: state.checkedSize,
})
const mapDispatchToProps=dispatch=>({
    ChangeChecked:value=>dispatch(selectSize(value))
})
export default connect(mapStateToProps,mapDispatchToProps)(Sider)
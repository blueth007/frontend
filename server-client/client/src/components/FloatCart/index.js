import React, { Component } from 'react'
import { Drawer, } from 'antd';
import './index.scss'
import ListItem from './ListItem';
import { connect } from 'react-redux';

class Cart extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { lists } = this.props;
        var quantity=0,total_price=0;
        lists.map(it=>{
            quantity+=it.quantity;
            total_price +=(it.quantity*it.price).toFixed(2)*1;
        })
        return (
            <div className="floatcart">
                <div className="cart-icon" onClick={this.showDrawer}>
                    <strong className="cart_total">{quantity}</strong>
                </div>
                <Drawer
                    width="auto"
                    title={
                        <div className="cart-icon" style={{ display: "inline-block" }} >
                            Cart
                            <strong className="cart_total">{quantity}</strong>
                        </div>
                    }
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <ListItem lists={lists} />
                    <div className="submit_total">
                        <h2><span>Total</span><span style={{float:"right",color:"gold"}}>$ {total_price.toFixed(2)}</span></h2>
                        <p><button onClick={()=>{
                            alert('$ '+total_price)
                        }}>Check Out</button></p>
                    </div>
                </Drawer>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    lists: Object.keys(state.shopCart).map(value=>{
        
        return state.products.items[value]
    })
})

export default connect(mapStateToProps)(Cart)

import React from 'react';
import classes from './Cart.module.css';
import { AppContext } from '../../containers/HomePage/HomePage';
import minusIcon from '../../assets/images/icons/minus.svg';
import plusIcon from '../../assets/images/icons/plus.svg';

class Cart extends React.Component {

    render() {
        return (
            //Need to check to see whether cart has products. If not, we just simply display a text 
            <AppContext.Consumer>
                {cartContext => {
                    return (
                        <React.Fragment>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className={classes['my-bag']}>
                                            My Bag
                                        </span>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "36px" }}>
                                    <div className={'col-md-4 ' + classes['text-left']}>
                                        Product
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        Color
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        Size
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        Quantity
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-right']}>
                                        Amount
                                    </div>
                                </div>
                                <div className={"row " + classes['cart-item']}>
                                    <div className="col-md-12">
                                        <div className="col-md-12" style={{ borderTop: "solid 1px lightgray", marginBottom: "10px" }}></div>
                                    </div>
                                    <div className={'col-md-4 ' + classes['text-left']}>
                                        <div className={classes['cart-item-image-frame']}>
                                            <img
                                                src={`http://localhost:5000/${cartContext.productsInCart[0].productImage}`}
                                                alt=""
                                                className={classes['cart-item-image']}
                                            />
                                        </div>
                                        <div className={classes['cart-item-text-frame']}>
                                            <span className={classes['cart-item-text']}>
                                                {cartContext.productsInCart[0].productBrand}
                                            </span>
                                            <span className={classes['cart-item-text']}>
                                                {cartContext.productsInCart[0].productName}
                                            </span>
                                            <span className={classes['cart-item-text-change-remove']}>
                                                <span>Change </span>
                                                |
                                                <span> Remove</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        <div className={classes['color']} style={{ backgroundColor: cartContext.productsInCart[0].chosenColor }}>
                                        </div>
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        <span className={classes['size']}>
                                            {cartContext.productsInCart[0].chosenSize}
                                        </span>
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-middle']}>
                                        <div className={classes['quantity-control-box']}>
                                            <img 
                                                className={classes['quantity-control-icon']} 
                                                src={minusIcon} 
                                                alt="" 
                                                onClick={() => cartContext.decreaseQuantityOfProductInCart(0)}/>
                                            {cartContext.productsInCart[0].chosenQuantity}
                                            <img 
                                                className={classes['quantity-control-icon']}
                                                src={plusIcon} 
                                                alt="" 
                                                onClick={() => cartContext.increaseQuantityOfProductInCart(0)}/>
                                        </div>
                                    </div>
                                    <div className={'col-md-2 ' + classes['text-right']}>
                                        <span className={classes['amount']}>
                                            ${cartContext.productsInCart[0].amount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                            </div>
                        </React.Fragment>
                    );
                }}
            </AppContext.Consumer>
        );
    }
};

export default Cart;
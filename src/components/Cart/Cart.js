import React from 'react';
import classes from './Cart.module.css';
import { AppContext } from '../../containers/HomePage/HomePage';
import minusIcon from '../../assets/images/icons/minus.svg';
import plusIcon from '../../assets/images/icons/plus.svg';
import FlatButton from '../UI/FlatButton';

class Cart extends React.Component {
    render() {
        return (
            //Need to check to see whether cart has products. If not, we just simply display a text 
            <AppContext.Consumer>
                {cartContext => {
                    const total = cartContext.productsInCart.reduce((acc, product) => {
                        return acc + product.amount;
                    }, 0);
                    const cartItems = cartContext.productsInCart.map((product, i) => {
                        return (
                            <div className={"row " + classes['cart-item']} key={i}>
                                <div className="col-md-12">
                                    <div className="col-md-12" style={{ borderTop: "solid 1px lightgray", marginBottom: "10px" }}></div>
                                </div>
                                <div className={'col-md-4 ' + classes['text-left']}>
                                    <div className={classes['cart-item-image-frame']}>
                                        <img
                                            src={`http://localhost:5000/${product.productImage}`}
                                            alt=""
                                            className={classes['cart-item-image']}
                                        />
                                    </div>
                                    <div className={classes['cart-item-text-frame']}>
                                        <span className={classes['cart-item-text']}>
                                            {product.productBrand}
                                        </span>
                                        <span className={classes['cart-item-text']}>
                                            {product.productName}
                                        </span>
                                        <span className={classes['cart-item-text-change-remove']}>
                                            <span>Change </span>
                                            |
                                                <span> Remove</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={'col-md-2 ' + classes['text-middle']}>
                                    <div className={classes['color']} style={{ backgroundColor: product.chosenColor }}>
                                    </div>
                                </div>
                                <div className={'col-md-2 ' + classes['text-middle']}>
                                    <span className={classes['size']}>
                                        {product.chosenSize}
                                    </span>
                                </div>
                                <div className={'col-md-2 ' + classes['text-middle']}>
                                    <div className={classes['quantity-control-box']}>
                                        <img
                                            className={classes['quantity-control-icon']}
                                            src={minusIcon}
                                            alt=""
                                            onClick={() => cartContext.decreaseQuantityOfProductInCart(i)} />
                                        {product.chosenQuantity}
                                        <img
                                            className={classes['quantity-control-icon']}
                                            src={plusIcon}
                                            alt=""
                                            onClick={() => cartContext.increaseQuantityOfProductInCart(i)} />
                                    </div>
                                </div>
                                <div className={'col-md-2 ' + classes['text-right']}>
                                    <span className={classes['amount']}>
                                        ${product.amount}
                                    </span>
                                </div>
                            </div>
                        );
                    });
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
                                {cartItems}
                            </div>
                            <div className={"col-md-4 " + classes['total-outer-box']} >
                                <span className={classes['text-left']}>
                                    Total
                                </span>
                                <div className={classes['total-box']}>
                                    <div className="d-flex justify-content-between">
                                        <span className={classes['total-text']}>Shipping & Handling:</span>
                                        <span className={classes['total-text']}>Free</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className={classes['total-text']}>Total product:</span>
                                        <span className={classes['total-text']}>${total}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <span className={classes['subtotal']}>Subtotal</span>
                                        <span className={classes['subtotal']}>${total}</span>
                                    </div>
                                </div>
                                <div style={{display: cartContext.amountOfProductsInCart > 0 ? 'block' : 'none'}}>
                                    <FlatButton
                                        backgroundColor="#ff5f6d"
                                        clicked={cartContext.isLogedIn ? cartContext.createOrderHandler : cartContext.openLogInFormHandler}>
                                        Check out
                                </FlatButton>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                }}
            </AppContext.Consumer>
        );
    }
};

export default Cart;
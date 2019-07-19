import React from 'react';
import logo from '../../assets/images/logo/logo.svg';
import classes from './Header.module.css';
import LogInButton from '../UI/LogInButton/LogInButton';
import SearchBox from './SearchBox/SearchBox';
import CategoryList from './CategoryList/CategoryList';
import { Link } from 'react-router-dom';
import NotificationBadge from '../UI/NotificationBadge';
import cartIcon from '../../assets/images/icons/cart.svg';
import { AppContext } from '../../containers/HomePage/HomePage';

class Header extends React.Component {
    state = {
        minicartOpen: false
    }

    toggleMiniCartHandler = () => {
        this.setState((prevState, props) => {
            return {
                minicartOpen: !prevState.minicartOpen
            }
        });
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    cartContext => {
                        const miniCartItems = cartContext.productsInCart.map((product, i) => {
                            return (
                                <Link
                                    to={{
                                        pathname: `/products/${product.productID}`
                                    }}
                                >
                                    <div className={classes['cart-item']} key={i}>
                                        <div className={classes['cart-item-image-frame']}>
                                            <img className={classes['cart-item-image']} src={`http://localhost:5000/${product.productImage}`} alt="" />
                                        </div>
                                        <div className={classes['cart-item-text-frame']}>
                                            <span className={classes['cart-item-text-name']}>{product.productName}</span>
                                            <span className={classes['cart-item-text-brand']}>{product.productBrand}</span>
                                            <span className={classes['cart-item-text-price']}>${product.productPrice}</span>
                                            <span className={classes['cart-item-text-size-color-quantity']}>
                                                {product.chosenSize}-{product.chosenColor}-{product.chosenQuantity}pcs
                                                </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        });
                        const minicart =
                            <React.Fragment>
                                {miniCartItems}
                                <Link to="/cart">
                                    <div className={classes['view-cart']}>
                                        View cart
                                    </div>
                                </Link>
                            </React.Fragment>
                        return (
                            <div className={classes.Header}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-3 d-flex justify-content-start align-items-center">
                                            <SearchBox />
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                                            <Link to="/dashboard"><img className={classes.Logo} src={logo} alt="AWARE"></img></Link>
                                        </div>
                                        <div className={`col-md-3 d-flex justify-content-around align-items-center ` + classes['menu-upper-right']}>
                                            <span
                                                className={classes['register-span']}
                                                style={{ display: this.props.isLogedIn ? 'none' : null }}
                                                onClick={this.props.registerButtonClicked}
                                            >
                                                Register
                                            </span>
                                            <LogInButton display={this.props.isLogedIn ? 'none' : null} clicked={this.props.logInButtonClicked}>Log in</LogInButton>
                                            <Link to="/profile">
                                                <span style={{ display: this.props.isLogedIn ? null : 'none', fontStyle: 'italic', color: '#ff6900' }}>{this.props.currentUserEmail}</span>
                                            </Link>
                                            <span className={classes['logout-span']} style={{ display: this.props.isLogedIn ? null : 'none' }} onClick={this.props.logOutButtonClicked}>Log out</span>
                                            <span>
                                                <NotificationBadge
                                                    src={cartIcon}
                                                    amount={cartContext.amountOfProductsInCart}
                                                    clicked={this.toggleMiniCartHandler}
                                                />
                                            </span>
                                            <div className={classes['mini-cart']} style={{display: this.state.minicartOpen ? 'block' : 'none'}}>
                                                {minicart}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <CategoryList />
                                    </div>
                                </div>
                                <hr style={{ marginBottom: '-18px', marginTop: '-10px', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.08)' }} />
                            </div>
                        );
                    }
                }
            </AppContext.Consumer>
        );
    }
};

export default Header;
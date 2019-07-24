import React from 'react';
import classes from './DashboardPage.module.css';
import SellerDashboardListItem from '../../../components/UI/SellerDashboardListItem/';
import productIcon from '../../../assets/images/icons/products-dark.svg';
import orderIcon from '../../../assets/images/icons/orders-dark.svg';
import logo from '../../../assets/images/logo/logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';

class DashboardPage extends React.Component {
    state = {
        title: <span className={classes['title-text']}>Products</span>
    }

    componentDidMount() {
        if (!this.props.sellerIsLogedIn) {
            this.props.history.replace('/seller');
        }
        if (this.props.match.url === "/seller" && this.props.history.location.pathname === "/seller/dashboard") {
            this.props.history.replace('/seller/dashboard/products');
        }
        if (this.props.history.location.pathname === "/seller/dashboard/orders") {
            this.setState({
                title: <span className={classes['title-text']}>Orders</span>
            });
        }
    }

    componentWillReceiveProps() {
        if (this.props.history.location.pathname === "/seller/dashboard/orders") {
            this.setState({
                title: <span className={classes['title-text']}>Orders</span>
            });
        }
        if (this.props.history.location.pathname === "/seller/dashboard/products") {
            this.setState({
                title: <span className={classes['title-text']}>Products</span>
            });
        }
    }

    componentDidUpdate() {
        if (!this.props.sellerIsLogedIn) {
            this.props.history.replace('/seller');
        }
    }

    setTitleInProducts = (title) => {
        if (title === "products") {
            this.setState({
                title: <span className={classes['title-text']}>Products</span>
            });
        } else {
            this.setState({
                title:
                    <div className="d-flex justify-content-start flex-column">
                        <span className={classes['title-text']}>Add product</span>
                        <span>Products / Add product</span>
                    </div>
            });
        }
    }

    render() {
        const { title } = this.state;
        return (
            <div className="container-fluid" style={{ backgroundColor: "#f6f6f6" }}>
                <div className="row">
                    <div className={classes['dashboard-left-side'] + " col-md-2 d-flex flex-column"}>
                        <div className="row">
                            <div className={classes['upper-element']}>
                                <Link to='/'>
                                    <img src={logo} alt="AWARE" />
                                </Link>
                            </div>
                            <NavLink to={this.props.match.url + '/dashboard/products'}><SellerDashboardListItem src={productIcon}>Products</SellerDashboardListItem></NavLink>
                            <NavLink to={this.props.match.url + '/dashboard/orders'}><SellerDashboardListItem src={orderIcon}>Orders</SellerDashboardListItem></NavLink>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className={classes['title']}>
                            {title}
                        </div>
                        <Switch>
                            <Route path={this.props.match.url + '/dashboard/orders'} component={Orders} />
                            <Route path={this.props.match.url + '/dashboard/products'} render={() => <Products setTitle={this.setTitleInProducts} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPage;
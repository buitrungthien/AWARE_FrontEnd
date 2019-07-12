import React from 'react';
import classes from './DashboardPage.module.css';
import SellerDashboardListItem from '../../../components/UI/SellerDashboardListItem/';
import productIcon from '../../../assets/images/icons/products-dark.svg';
import orderIcon from '../../../assets/images/icons/orders-dark.svg';
import logo from '../../../assets/images/logo/logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import Products from './Products';

class DashboardPage extends React.Component {
    componentDidMount() {
        if (!this.props.sellerIsLogedIn) {
            this.props.history.replace('/seller');
        }
    }

    componentDidUpdate() {
        if (!this.props.sellerIsLogedIn) {
            this.props.history.replace('/seller');
        }
    }

    render() {

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
                        <Switch>
                            <Route path={this.props.match.url + '/dashboard/products'} component={Products}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPage;
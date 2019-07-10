import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogInPage from './LogInPage';
import DashboardPage from './DashboardPage';

class Seller extends React.Component {
    state = {
        sellerIsLogedIn: false
    }

    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + '/dashboard'} component={DashboardPage}/>
                <Route path={this.props.match.url} component={LogInPage} />
            </Switch>
        );
    }
};

export default Seller;
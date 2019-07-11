import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogInPage from './LogInPage';
import DashboardPage from './DashboardPage';
import axios from 'axios';

class Seller extends React.Component {
    state = {
        isLogedIn: false,
        doneChecking: false
    }

    async componentWillMount() {
        if (localStorage.getItem('token')) {
            const response = await axios.get('http://localhost:5000/api/users/seller', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (response.status === 200) {
                this.setState({
                    isLogedIn: true,
                })
            }
            this.setState({
                doneChecking: true
            });
        }
        this.setState({
            doneChecking: true
        });
    }

    storeToken = async (token) => {
        localStorage.setItem("token", token);
        const response = await axios.get('http://localhost:5000/api/users/seller', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            this.setState({
                isLogedIn: true,
                currentUser: {
                    id: response.data._id,
                    isSeller: response.data.isSeller,
                    name: response.data.name,
                    email: response.data.email
                }
            });
            this.props.history.push('/seller/dashboard');
        }
    }

    render() {
        console.log('seller login', this.state.isLogedIn);
        console.log('seller checking', this.state.doneChecking);
        return (
            <Switch>
                <Route
                    path={this.props.match.url + '/dashboard'}
                    render={() => <DashboardPage 
                                    sellerIsLogedIn={this.state.isLogedIn} 
                                    history={this.props.history} 
                                    doneChecking={this.state.doneChecking}/>}
                />
                <Route 
                    path={this.props.match.url}
                    render={() => <LogInPage token={this.storeToken}/>}
                />
            </Switch>
        );
    }
};

export default Seller;
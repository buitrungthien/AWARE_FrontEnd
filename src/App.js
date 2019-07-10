import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Seller from './containers/Seller';
class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route path="/seller" component={Seller}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    };
}

export default App;
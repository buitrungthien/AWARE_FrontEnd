import React from 'react';
// import LogIn from './components/SellerDashboard/LogIn/LogIn';
// import DashboardLayout from './components/SellerDashboard/DashboardLayout/DashboardLayout';
// import Badge from './common/components/Badge/Badge';
import Auxxx from './hoc/Auxxx/Auxxx';
import HomePage from './containers/HomePage/HomePage';

class App extends React.Component {

    state = {
        registerFormIsShow: true
    };

    closeFormHandler = () => {
        this.setState({
            registerFormIsShow: false
        });
    }

    render() {
        return (
            <Auxxx>
                <HomePage />
                {/* <hr />
                <LogIn />
                <DashboardLayout />
                <Badge /> */}
            </Auxxx>
        );
    };
}

export default App;

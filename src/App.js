import React from 'react';
import LogIn from './components/SellerDashboard/LogIn/LogIn';
import DashboardLayout from './components/SellerDashboard/DashboardLayout/DashboardLayout';
import Badge from './common/components/Badge/Badge';
import Auxxx from './hoc/Auxxx/Auxxx';

function App() {
    return (
        <Auxxx>
            <LogIn />
            <DashboardLayout />
            <Badge />
        </Auxxx>
    );
}

export default App;

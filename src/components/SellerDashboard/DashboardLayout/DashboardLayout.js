import React from 'react';
import classes from './DasboardLayout.module.css';
// import Logo from '../../../assets/images/logo/logo.svg';
import LogIn from '../LogIn/LogIn';
// import ListItems from './ListItems/ListItems';

class DashboardLayout extends React.Component {



    render () {

        return (
            <div className={classes.DashboardLayout}>
                {/* <div className={classes.DashboardLeft}>
                    {/* <img src={Logo} alt="AWARE"/> */}
                    {/* <ListItems /> */}
                {/* </div> */}
                    <LogIn />
                <div className={classes.DashboardRight}></div>
            </div>
        );
    }
}

export default DashboardLayout;
import React from 'react';
import logo from '../../assets/images/logo/logo.svg';
import classes from './Header.module.css';
import LogInButton from '../UI/LogInButton/LogInButton';
import SearchBox from './SearchBox/SearchBox';
import CategoryList from './CategoryList/CategoryList';


const header = (props) => {
    return (
        <div className={classes.Header}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 d-flex justify-content-start align-items-center">
                        <SearchBox />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img className={classes.Logo} src={logo} alt="AWARE"></img>
                    </div>
                    <div className="col-md-3 d-flex justify-content-around align-items-center">
                        <span className={classes['register-span']} style={{ display: props.isLogedIn ? 'none' : null}} onClick={props.registerButtonClicked}>Register</span>
                        <LogInButton display={props.isLogedIn ? 'none' : null} clicked={props.logInButtonClicked}>Log in</LogInButton>
                        <span style={{ display: props.isLogedIn ? null : 'none', fontStyle: 'italic', color: '#ff6900'}}>{props.currentUserEmail}</span>
                        <span className={classes['logout-span']} style={{ display: props.isLogedIn ? null : 'none'}} onClick={props.logOutButtonClicked}>Log out</span>
                        <span>Cart</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    <CategoryList />
                </div>
            </div>
        </div>
    );
};

export default header;
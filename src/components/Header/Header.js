import React from 'react';
import logo from '../../assets/images/logo/logo.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import classes from './Header.module.css';
import LogInButton from '../UI/LogInButton/LogInButton';
import SearchBox from './SearchBox/SearchBox';


const header = (props) => {

    let styleForArrow = {
        bottom: "-3px",
        position: "absolute"
    };

    const allCategories = [
        { name: "Men" },
        { name: "Ladies" },
        { name: "Girls" },
        { name: "Boys" },
    ];

    const categoryList = allCategories.map(category => {
        return (
            <span key={category.name}>
                {category.name}
                <img style={styleForArrow} src={arrow} alt="" />
            </span>
        );
    });

    return (
        <div className={classes.Header}>
            <div className="my-container">
                <div className="row">
                    <SearchBox />
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <img className={classes.Logo} src={logo} alt="AWARE"></img>
                    </div>
                    <div className="col-3 d-flex justify-content-around align-items-center">
                        <span className={classes['register-span']} style={{ display: props.isLogedIn ? 'none' : null}} onClick={props.registerButtonClicked}>Register</span>
                        <LogInButton display={props.isLogedIn ? 'none' : null} clicked={props.logInButtonClicked}>Log in</LogInButton>
                        <span className={classes['logout-span']} style={{ display: props.isLogedIn ? null : 'none'}} onClick={props.logOutButtonClicked}>Log out</span>
                        <span>Cart</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="my-container">
                <div className="row">
                    <div className={classes.NavigationBar}>
                        {categoryList}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default header;
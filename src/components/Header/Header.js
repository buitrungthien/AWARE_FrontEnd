import React from 'react';
import logo from '../../assets/images/logo/logo.svg';
import searchIcon from '../../assets/images/icons/search.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import classes from './Header.module.css';


const header = (props) => {

    let styleForArrow = {
        bottom: "-3px",
        position: "absolute"
    };

    const allCategories = [
        {name: "Men"},
        {name: "Ladies"},
        {name: "Girls"},
        {name: "Boys"},
    ];

    const categoryList = allCategories.map(category => {
        return <span>{category.name}<img style={styleForArrow} src={arrow} alt="" /></span>
    });

    return (
        <div className={classes.Header}>
            <div className={classes.UpperHeader}>
                <div className={classes.SearchBox}>
                    <input placeholder="Search"></input>
                    <img src={searchIcon} name="searchIcon" alt="search"></img>
                </div>
                <img className={classes.Logo} src={logo} alt="AWARE"></img>
                <div className={classes.UpperRight}>
                    <a href="/">Register</a>
                    <button>Log In</button>
                    <span>Cart</span>
                </div>
            </div>
            <hr />
            <div className={classes.NavigationBar}>
                {categoryList}
            </div>
        </div>
    );
};

export default header;
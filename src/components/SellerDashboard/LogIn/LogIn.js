import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import classes from './LogIn.module.css';
import Logo from '../../../assets/images/logo/logo-white.svg';

const logIn = (props) => (
    <div className={classes.Background}>
        <img src={Logo} alt="AWARE" style={{paddingLeft: '20px'}}/>
        <LogInForm></LogInForm>
    </div>
);

export default logIn;
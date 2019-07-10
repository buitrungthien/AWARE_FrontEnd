import React from 'react';
import LogInForm from './LogInForm/LogInForm';
import classes from './LogInPage.module.css';
import Logo from '../../../assets/images/logo/logo-white.svg';
import { Link } from 'react-router-dom';

const logInPage = (props) => (
    <div className={classes.Background}>
        <Link to="/" ><img src={Logo} alt="AWARE" style={{paddingLeft: '20px'}}/></Link>
        <LogInForm></LogInForm>
    </div>
);

export default logInPage;
import React from 'react';
import Input from '../../../common/components/Input/Input';
import PrimaryButton from '../../../common/components/PrimaryButton/PrimaryButton';
import classes from './LogInForm.module.css';

const logInForm = (props) => {

    return (
        <div className={classes.LogInForm}>
            <span className={classes.Text}>Log in</span>
            <Input fieldName={'email'} placeHolder={'email@sample.com'} type={'text'}></Input>
            <Input fieldName={'password'} placeHolder={'Enter Password'} type={'password'}></Input>
            <PrimaryButton>Log in</PrimaryButton>
            <span className={classes.ForgotPassword}>Forgot password</span>
        </div>
    );

}

export default logInForm;
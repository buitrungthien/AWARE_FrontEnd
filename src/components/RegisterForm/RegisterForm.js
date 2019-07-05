import React from 'react';
import Input from '../UI/Input/Input';
import classes from './RegisterForm.module.css';
import FlatButton from '../UI/FlatButton/FlatButton';

const registerForm = (props) => {

    return (
        <form className={classes['form']}>
            <label className={classes['form-title']}>Register</label>
            <Input inputype="input" type="text" label="NAME" placeholder="Enter your name..."></Input>
            <Input inputype="input" type="text" label="E-MAIL" placeholder="Enter your email..."></Input>
            <Input inputype="input" type="password" label="PASSWORD" placeholder="Enter your password..."></Input>
            <span 
                className={classes['terms-policies']}>
                By creating an account you agree to the
                <span className={classes['orange-underline-bold']}> Terms of Service </span>
                and 
                <span className={classes['orange-underline-bold']}> Privacy Policy </span>
            </span>
            <FlatButton backGroundColor={props.validForm ? '#ffa15f' : '#d4d3d3'}>Register</FlatButton>
        </form>
    );
}

export default registerForm;
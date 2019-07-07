import React from 'react';
import classes from './LogInButton.module.css';

const logInButton = (props) => (
    <button 
        className={classes['login-button']}
        onClick={props.clicked}
        style={{display: props.display}}
        >{props.children}
    </button>
);

export default logInButton;
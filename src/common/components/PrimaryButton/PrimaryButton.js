import React from 'react';
import classes from './PrimaryButton.module.css';

const primaryButton = (props) => (
    <div className={classes.PrimaryButton}>{props.children}</div>
);

export default primaryButton;
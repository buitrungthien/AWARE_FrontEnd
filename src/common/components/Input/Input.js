import React from 'react';
import classes from './Input.module.css';

const input = (props) => (
    <div className={classes.InputBox}>
        <span className={classes.FieldName}>{props.fieldName}</span>
        <input 
            className={classes.Input} 
            placeholder={props.placeHolder}
            type={props.type}/>
    </div>
);

export default input;
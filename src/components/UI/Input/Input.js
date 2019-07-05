import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes['input-element']} 
                {...props.elementConfig}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes['input-element']} 
                {...props.elementConfig}/>;
            break;
        default:
            inputElement = <input 
                className={classes['input-element']} 
                {...props.elementConfig}/>;
    }

    return (
        <div className={classes['input']}>
            <label className={classes['label']}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.inuttype) {
        case ('input'):
            inputElement = <input className={classes['input-element']} {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes['input-element']} {...props} />;
            break;
        default:
            inputElement = <input className={classes['input-element']} {...props} />;
    }

    return (
        <div className={classes['input']}>
            <label className={classes['label']}>{props.label}</label>
            {inputElement}
        </div>
    );
}



export default input;
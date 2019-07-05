import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes['input-element']} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes['input-element']} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input 
                className={classes['input-element']} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={classes['input']}>
            <label className={classes['label']}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
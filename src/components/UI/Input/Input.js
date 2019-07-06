import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes['input-element']];
    let errorValidationMessage = null;

    if (props.inValid && props.touched) {
        inputClasses.push(classes['invalid']);
        errorValidationMessage = <p className={classes['error-validation-message']}>{ props.label }{ props.errorValidationMessage }</p>;
        console.log(props.errorValidationMessage);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>; 
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={classes['input']}>
            <label className={classes['label']}>{props.label}</label>
            {inputElement}
            {errorValidationMessage}
        </div>
    );
}

export default input;
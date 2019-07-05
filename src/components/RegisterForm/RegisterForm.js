import React from 'react';
import Input from '../UI/Input/Input';
import classes from './RegisterForm.module.css';
import FlatButton from '../UI/FlatButton/FlatButton';

const registerForm = (props) => {

    const formElementsArray = [];
    for (let key in props.registerInputs) {
        formElementsArray.push({
            id: key,
            config: props.registerInputs[key]
        });
    }

    return (
        <form className={classes['form']}>
            <label className={classes['form-title']}>Register</label>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    />
            ))}
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
import React from 'react';
import Input from '../UI/Input/Input';
import classes from './RegisterForm.module.css';
import FlatButton from '../UI/FlatButton/FlatButton';
import * as CommonConstants from '../../constants/index';
import axios from 'axios';

class RegisterForm extends React.Component {

    state = {
        validForm: false,
        registerForm: CommonConstants.REGISTER_FORM_INIT,
        errorMessageFromServer: ''
    }

    inputChangedHandler = (event, inputIndentifier) => {
        if (inputIndentifier === 'email') {
            this.setState({
                errorMessageFromServer: ''
            });
        }
        const updatedRegisterForm = {
            ...this.state.registerForm
        }
        const updatedFormElement = {
            ...updatedRegisterForm[inputIndentifier]
        }
        updatedFormElement.errorValidationMessage = '';
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).isValid;
        updatedFormElement.errorValidationMessage = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).errorMessage;
        updatedFormElement.touched = true;
        updatedRegisterForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            registerForm: updatedRegisterForm,
            validForm: formIsValid,
        });
    }

    registerHandler = async (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

        try {
            await axios.post('http://localhost:5000/api/users', { ...formData });
            this.setState({
                registerForm: CommonConstants.REGISTER_FORM_INIT
            });
        } catch (error) {
            if (error.response) {
                this.setState({
                    errorMessageFromServer: error.response.data
                });
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }

    }

    checkValidity (value, rules) {
        let isValid = true;
        let errorMessage = '';
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            // eslint-disable-next-line
            value.trim() == '' ? errorMessage = `${errorMessage} is required` : errorMessage = errorMessage;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            // eslint-disable-next-line
            value.length !== 0 && value.length < rules.minLength ? errorMessage = `${errorMessage} must have minimum ${rules.minLength} characters long` : errorMessage = errorMessage;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            // eslint-disable-next-line
            value.length > rules.maxLength ? errorMessage = `${errorMessage} must have maximum ${rules.maxLength} characters long` : errorMessage = errorMessage;
        }

        return {
            isValid,
            errorMessage
        };
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }
        return (
            <form
                className={classes['form']}
                onSubmit={this.registerHandler}
            >
                <label className={classes['form-title']}>Register</label>
                {this.state.errorMessageFromServer ? <p className={classes['error-message-from-server']}>{this.state.errorMessageFromServer}</p> : null}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        label={formElement.config.label}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        errorValidationMessage={formElement.config.errorValidationMessage}
                        errorMessageFromServer={this.state.errorMessageFromServer}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <span
                    className={classes['terms-policies']}>
                    By creating an account you agree to the
                    <span className={classes['orange-underline-bold']}> Terms of Service </span>
                    and
                    <span className={classes['orange-underline-bold']}> Privacy Policy </span>
                </span>
                <FlatButton backGroundColor='#ffa15f' disabled={!this.state.validForm}>Register</FlatButton>
            </form>
        );
    }
}

export default RegisterForm;
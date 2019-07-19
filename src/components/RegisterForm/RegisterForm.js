import React from 'react';
import Input from '../UI/Input/Input';
import classes from './RegisterForm.module.css';
import FlatButton from '../UI/FlatButton/FlatButton';
import * as CommonConstants from '../../constants/index';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

class RegisterForm extends React.Component {

    state = {
        validForm: false,
        registerForm: CommonConstants.REGISTER_FORM_INIT,
        messageFromServer: '',
        responseStatusFromServer: '',
        formLoading: false
    }

    inputChangedHandler = (event, inputIndentifier) => {
        if (inputIndentifier === 'email') {
            this.setState({
                messageFromServer: ''
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
        this.setState({
            formLoading: true
        });
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users', { ...formData });
            this.setState({
                validForm: false,
                registerForm: CommonConstants.REGISTER_FORM_INIT,
                messageFromServer: 'Register new user successfully!!!',
                responseStatusFromServer: response.status,
                formLoading: false
            });
        } catch (error) {
            if (error.response) {
                this.setState({
                    validForm: false,
                    messageFromServer: error.response.data,
                    responseStatusFromServer: error.response.status,
                    formLoading: false
                });
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }

    }

    checkValidity(value, rules) {
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
            <React.Fragment>
                <Spinner display={this.state.formLoading ? 'block' : 'none'} />
                <form style={{ visibility: this.state.formLoading ? 'hidden' : null }}
                    className={classes['form']}
                    onSubmit={this.registerHandler}
                >
                    <label className={classes['form-title']}>Register</label>

                    {
                        this.state.messageFromServer ?
                            <p className={this.state.responseStatusFromServer === 200 ? classes['success-message-from-server']
                                : classes['error-message-from-server']}>{this.state.messageFromServer}</p> : null
                    }

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
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <span
                        className={classes['terms-policies']}>
                        By creating an account you agree to the
                        <span className={classes['orange-underline-bold']}> Terms of Service </span>
                        and
                        <span className={classes['orange-underline-bold']}> Privacy Policy </span>
                    </span>
                    <div style={{padding: '10px'}}>
                        <FlatButton backgroundColor='#ffa15f' disabled={!this.state.validForm}>Register</FlatButton>
                    </div>
                    <hr></hr>
                    <span style={{ paddingBottom: 0 }} className={classes['terms-policies']}>
                        Do you have an account?
                        <span
                            onClick={this.props.changeForm}
                            className={classes['orange-underline-bold']}> Log in
                        </span>
                    </span>
                </form>
            </React.Fragment>
        );
    }
}

export default RegisterForm;
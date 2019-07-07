import React from 'react';
import classes from '../RegisterForm/RegisterForm.module.css';
import * as CommonConstants from '../../constants/index';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import Input from '../UI/Input/Input';
import FlatButton from '../UI/FlatButton/FlatButton';

class LogInForm extends React.Component {
    state = {
        validForm: false,
        logInForm: CommonConstants.LOGIN_FORM_INIT,
        messageFromServer: '',
        responseStatusFromServer: '',
        formLoading: false
    }

    inputChangedHandler = (event, inputIndentifier) => {

        const updatedLogInForm = {
            ...this.state.logInForm
        }
        const updatedFormElement = {
            ...updatedLogInForm[inputIndentifier]
        }
        updatedFormElement.errorValidationMessage = '';
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).isValid;
        updatedFormElement.errorValidationMessage = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).errorMessage;
        updatedFormElement.touched = true;
        updatedLogInForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLogInForm) {
            formIsValid = updatedLogInForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            logInForm: updatedLogInForm,
            validForm: formIsValid
        });
    }

    logInHandler = async (event) => {
        this.setState({
            formLoading: true
        });
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.logInForm) {
            formData[formElementIdentifier] = this.state.logInForm[formElementIdentifier].value;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', { ...formData });
            this.setState({
                validForm: false,
                logInForm: CommonConstants.LOGIN_FORM_INIT,
                messageFromServer: 'Login successfully!!!',
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
        for (let key in this.state.logInForm) {
            formElementsArray.push({
                id: key,
                config: this.state.logInForm[key]
            });
        }
        return (
            <React.Fragment>
                <Spinner display={this.state.formLoading ? 'block' : 'none'} />
                <form style={{ visibility: this.state.formLoading ? 'hidden' : null }}
                    className={classes['form']}
                    onSubmit={this.logInHandler}
                >
                    <label className={classes['form-title']}>Log In</label>

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
                            messageFromServer={this.state.messageFromServer}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <FlatButton backGroundColor='#ffa15f' disabled={!this.state.validForm}>Register</FlatButton>
                    <hr></hr>
                    <span style={{ paddingBottom: 0 }} className={classes['terms-policies']}>
                        Don't have an account?
                        <span
                            onClick={this.props.changeForm}
                            className={classes['orange-underline-bold']}> Register
                        </span>
                    </span>
                </form>
            </React.Fragment>
        );
    }
}

export default LogInForm;
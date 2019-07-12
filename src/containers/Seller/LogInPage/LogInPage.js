import React from 'react';
import classes from './LogInPage.module.css';
import Logo from '../../../assets/images/logo/logo-white.svg';
import { Link } from 'react-router-dom';
import * as CommonConstants from '../../../constants/index';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import FlatButton from '../../../components/UI/FlatButton/FlatButton';


class LogInPage extends React.Component {

    state = {
        validForm: false,
        logInForm: CommonConstants.LOGIN_FORM_INIT,
        messageFromServer: ''
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

    logInHandler = async (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.logInForm) {
            formData[formElementIdentifier] = this.state.logInForm[formElementIdentifier].value;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', { ...formData });
            this.props.token(response.data);
        } catch (error) {
            if (error.response) {
                this.setState({
                    validForm: false,
                    messageFromServer: 'Incorrect email or password!!!',
                    responseStatusFromServer: error.response.status
                });
            } else if (error.request) {
                this.setState({
                    validForm: false,
                    messageFromServer: 'Incorrect email or password!!!',
                    responseStatusFromServer: error.response.status
                });
                console.log(error.request);
            } else {
                this.setState({
                    validForm: false,
                    messageFromServer: 'Incorrect email or password!!!',
                    responseStatusFromServer: error.response.status
                });
            }
        }
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
                <div className={classes.Background}>
                    <Link to="/" ><img src={Logo} alt="AWARE" style={{ paddingLeft: '20px' }} /></Link>
                </div>
                <form style={{ visibility: this.state.formLoading ? 'hidden' : null }}
                    className={classes['form']}
                    onSubmit={this.logInHandler}
                >
                    <label className={classes['form-title']}>Log In</label>

                    {this.state.messageFromServer ? <p className={classes['error-message']}>{this.state.responseStatusFromServer !== 200 ? this.state.messageFromServer : null}</p> : null}

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
                    <div style={{marginTop: '10px'}}>
                        <FlatButton backgroundColor='#ffa15f' disabled={!this.state.validForm}>Log in</FlatButton>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default LogInPage;
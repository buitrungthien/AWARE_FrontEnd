import React from 'react';
import Input from '../UI/Input/Input';
import classes from './RegisterForm.module.css';
import FlatButton from '../UI/FlatButton/FlatButton';
import * as CommonConstants from '../../constants/index';
import axios from 'axios';

class RegisterForm extends React.Component {

    state = {
        validForm: true,
        registerForm: CommonConstants.REGISTER_FORM_INIT
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedRegisterForm = {
            ...this.state.registerForm
        }
        const updatedFormElement = {
            ...updatedRegisterForm[inputIndentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedRegisterForm[inputIndentifier] = updatedFormElement;
        this.setState({
            registerForm: updatedRegisterForm
        });
    }

    registerHandler = async (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users', { ...formData });
            this.setState({
                registerForm: CommonConstants.REGISTER_FORM_INIT
            });
            console.log(response);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }

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
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        label={formElement.config.label}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <span
                    className={classes['terms-policies']}>
                    By creating an account you agree to the
                    <span className={classes['orange-underline-bold']}> Terms of Service </span>
                    and
                    <span className={classes['orange-underline-bold']}> Privacy Policy </span>
                </span>
                <FlatButton backGroundColor={this.state.validForm ? '#ffa15f' : '#d4d3d3'}>Register</FlatButton>
            </form>
        );
    }
}

export default RegisterForm;
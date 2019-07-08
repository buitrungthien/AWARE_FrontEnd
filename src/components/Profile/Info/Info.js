import React from 'react';
import InfoElement from './InfoElement/InfoElement';
import classes from './Info.module.css';
import Input from '../../UI/Input/Input';
import FlatButton from '../../UI/FlatButton/FlatButton';
import * as CommonConstants from '../../../constants/index';

class Info extends React.Component {
    state = {
        validForm: true,
        changeInfoForm: CommonConstants.CHANGE_INFO_FORM_INIT,
        messageFromServer: '',
        responseStatusFromServer: '',
        formLoading: false
    }

    inputChangedHandler = (event, inputIndentifier) => {

        const updatedChangeInfoForm = {
            ...this.state.changeInfoForm
        }
        const updatedFormElement = {
            ...updatedChangeInfoForm[inputIndentifier]
        }
        updatedFormElement.errorValidationMessage = '';
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).isValid;
        updatedFormElement.errorValidationMessage = this.checkValidity(updatedFormElement.value, updatedFormElement.validation).errorMessage;
        updatedFormElement.touched = true;
        updatedChangeInfoForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedChangeInfoForm) {
            formIsValid = updatedChangeInfoForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            changeInfoForm: updatedChangeInfoForm,
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

    render() {
        const formElementsArray = [];
        for (let key in this.state.changeInfoForm) {
            formElementsArray.push({
                id: key,
                config: this.state.changeInfoForm[key]
            });
        }
        return (
            <React.Fragment >
                <div className="row justify-content-between">
                    <b>Information</b>
                    <span
                        style={{ fontSize: '12px', cursor: 'pointer', display: this.props.editing ? 'none' : null }}
                        onClick={this.props.toggleEdit}>
                        Edit
                    </span>
                </div>
                <div className={`row ${classes['info']}`} style={{ display: 'block' }}>
                    { !this.props.editing ? <InfoElement label="Name">{this.props.userName}</InfoElement> : null }
                    { !this.props.editing ? <InfoElement label="E-mail">{this.props.userEmail}</InfoElement> : null }
                    {
                        this.props.editing ?
                        formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                label={formElement.config.label}
                                // value={formElement.config.value}
                                value={ formElement.config.touched ? formElement.config.value : formElement.id === 'name' ? this.props.userName : this.props.userEmail}
                                inValid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                errorValidationMessage={formElement.config.errorValidationMessage}
                                messageFromServer={this.state.messageFromServer}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        ))
                        : null
                    }
                    {
                        this.props.editing ?
                            <div className="row d-flex align-items-baseline">
                                <div className="col-md-2 offset-md-5">
                                    <label 
                                        style={{cursor: 'pointer'}}
                                        onClick={this.props.toggleEdit}>
                                        Cancel
                                    </label>
                                </div>
                                <div className="col-md-5">
                                    <FlatButton backGroundColor='#ffa15f' disabled={!this.state.validForm}>Save</FlatButton>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </React.Fragment >
        );
    };

};

export default Info;
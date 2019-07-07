import React from 'react';
import * as CommonConstants from '../../constants/index';
import Auxxx from '../../hoc/Auxxx/Auxxx';
import Modal from '../../components/UI/Modal/Modal';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LogInForm from '../../components/LogInForm/LogInForm';

class HomePage extends React.Component {

    state = {
        modalOpen: false,
        typeOfForm: '',
    }

    formCloseHandler = () => {
        this.setState({
            modalOpen: false
        });
    }

    openRegisterFormHandler = () => {
        this.setState({
            modalOpen: true,
            typeOfForm: CommonConstants.FORM_TYPES.register
        });
    }

    openLogInFormHandler = () => {
        this.setState({
            modalOpen: true,
            typeOfForm: CommonConstants.FORM_TYPES.normalLogIn
        });
    }

    changeFormHandler (typeOfForm) {
        this.setState({
            typeOfForm: typeOfForm
        });
    }

    render() {

        return (
            <Auxxx>
                <h1>This is the Home Page</h1>
                <button onClick={this.openRegisterFormHandler}>Register</button>&nbsp;
                <button onClick={this.openLogInFormHandler}>Log in</button>
                {
                    this.state.modalOpen ? 
                    <Modal show={this.state.modalOpen} closeModal={this.formCloseHandler}>
                        {
                            this.state.typeOfForm === CommonConstants.FORM_TYPES.register ? 
                            <RegisterForm changeForm={() => this.changeFormHandler(CommonConstants.FORM_TYPES.normalLogIn)}/> 
                            : this.state.typeOfForm === CommonConstants.FORM_TYPES.normalLogIn ?
                            <LogInForm changeForm={() => this.changeFormHandler(CommonConstants.FORM_TYPES.register)}/>
                            : null
                        }
                    </Modal>
                    : null
                }
            </Auxxx>
        );
    }
}

export default HomePage;
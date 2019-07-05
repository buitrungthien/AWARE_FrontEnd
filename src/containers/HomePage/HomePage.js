import React from 'react';
import * as CommonConstant from '../../constant/index';
import Auxxx from '../../hoc/Auxxx/Auxxx';
import Modal from '../../components/UI/Modal/Modal';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class HomePage extends React.Component {

    state = {
        modalOpen: false,
        typeOfForm: '',
        validForm: true
    }

    formCloseHandler = () => {
        this.setState((prevState, props) => {
            return {
                modalOpen: !prevState.modalOpen
            }
        });
    }

    openRegisterFormHandler = () => {
        this.setState({
            modalOpen: true,
            typeOfForm: CommonConstant.FORM_TYPES.register
        });
    }

    render() {
        return (
            <Auxxx>
                <h1>This is the Home Page</h1>
                <button onClick={this.openRegisterFormHandler}>Click me to register an account</button>
                {
                    this.state.modalOpen ? 
                    <Modal show={this.state.modalOpen} closeModal={this.formCloseHandler}>
                        {this.state.typeOfForm === CommonConstant.FORM_TYPES.register ? <RegisterForm validForm={this.state.validForm}/> : null}
                    </Modal>
                    : null
                }
            </Auxxx>
        );
    }
}

export default HomePage;
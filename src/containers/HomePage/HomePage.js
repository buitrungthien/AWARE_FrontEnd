import React from 'react';
import * as CommonConstant from '../../constant/index';
import Auxxx from '../../hoc/Auxxx/Auxxx';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class HomePage extends React.Component {

    state = {
        ModalOpen: true,
        typeOfForm: '',
        validForm: true
    }
    render() {
        return (
            <Auxxx>
                <h1>This is the Home Page</h1>
                {
                    this.state.ModalOpen ? 
                    <Modal show={this.state.ModalOpen}>
                        <RegisterForm validForm={this.state.validForm} />
                    </Modal>
                    : null
                }
            </Auxxx>
        );
    }
}

export default HomePage;
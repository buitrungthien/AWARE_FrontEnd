import React from 'react';
import InputAddProd from '../UI/InputAddProd';
import FlatButton from '../UI/FlatButton';
import Buttons from './Buttons';
import { ADD_PRODUCT_FORM_INIT } from '../../constants/index';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class AddProductForm extends React.Component {
    state = {
        images: [],
        addProductForm: ADD_PRODUCT_FORM_INIT,
        messageFromServer: '',
        addingProduct: false
    }

    imageOnChange = async e => {
        const files = Array.from(e.target.files);
        e.target.value = null; // this is a BIG TRICK, reset the input file type to null
        const formData = new FormData();
        formData.append('productImage', files[0]);
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/products/images', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'x-auth-token': token
            }
        });
        if (response) {
            let responseData = [...this.state.images];
            const imgPath = response.data;
            responseData.push(imgPath);
            this.setState({
                images: responseData
            });
        }
    }

    removeImage = async (index, imgPath) => {
        const response = await axios.delete('http://localhost:5000/api/products/images', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                imgPath: imgPath
            }
        });
        if (response) {
            let result = [...this.state.images];
            result.splice(index, 1);
            this.setState({
                images: result
            });
        }
    }

    inputChangedHandler = async (event, inputIndentifier) => {
        const updatedAddProductForm = {
            ...this.state.addProductForm
        }
        const updatedFormElement = {
            ...updatedAddProductForm[inputIndentifier]
        }
        if (updatedFormElement.elementType === 'multi-select') {
            updatedFormElement.value = event.map(element => element.value);
        } else if (updatedFormElement.elementType === 'single-select') {
            updatedFormElement.value = event.value;
        } else {
            updatedFormElement.value = event.target.value;
        }
        updatedAddProductForm[inputIndentifier] = updatedFormElement;

        this.setState({
            addProductForm: updatedAddProductForm
        });
    }

    addProductHandler = async (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.addProductForm) {
            formData[formElementIdentifier] = this.state.addProductForm[formElementIdentifier].value;
        }
        console.log(formData);
        try {
            await axios.post('http://localhost:5000/api/products', { ...formData }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            this.setState({
                addProductForm: ADD_PRODUCT_FORM_INIT,
                messageFromServer: 'Added product successfully!!!'
            });
            this.notify(this.state.messageFromServer, true);
        } catch (error) {
            if (error.response) {
                this.setState({
                    messageFromServer: error.response.data,
                });
                this.notify(this.state.messageFromServer, false);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    notify = (message, isSuccess) => {
        isSuccess ? toast.success(message) : toast.error(message);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.addProductForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addProductForm[key]
            });
        }
        return (
            <React.Fragment>
                <ToastContainer autoClose={1500} />
                <form onSubmit={this.state.addProductHandler}>
                    <Buttons onChange={this.imageOnChange} onDelete={this.removeImage} productImages={this.state.images} />
                    {formElementsArray.map(formElement => (
                        <InputAddProd
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            label={formElement.config.label}
                            value={formElement.config.value}
                            selectOptions={formElement.config.selectOptions}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <div style={{ width: '85%', marginLeft: '10px', marginBottom: '20px' }} className="d-flex justify-content-end">
                        <div style={{ width: '180px' }}>
                            <FlatButton clicked={this.props.closeFormHandler} type="button" backgroundColor="white">Cancel</FlatButton>
                        </div>
                        <div style={{ width: '180px' }}>
                            <FlatButton backgroundColor="#ffa15f">Complete</FlatButton>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default AddProductForm;
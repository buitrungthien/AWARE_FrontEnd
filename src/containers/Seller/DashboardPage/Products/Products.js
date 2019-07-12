import React from 'react';
import * as CommonConstants from '../../../../constants/index';
import axios from 'axios';
import classes from './Products.module.css';
import { ToastContainer, toast } from 'react-toastify';
import AddProductForm from './AddProductForm';

class Products extends React.Component {
    state = {
        addProductForm: CommonConstants.ADD_PRODUCT_FORM_INIT,
        messageFromServer: '',
        addingProduct: false
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
                logInForm: CommonConstants.ADD_PRODUCT_FORM_INIT,
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
                // console.log(error.request);
            } else {
                // console.log('Error', error.message);
            }
        }
    }

    notify = (message, isSuccess) => {
        isSuccess ? toast.success(message) : toast.error(message);
    }

    openFormHandler = () => {
        this.setState({
            addingProduct: true
        });
    }

    closeFormHandler = () => {
        this.setState({
            addingProduct: false
        });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.addingProduct ?
                        <React.Fragment>
                            <ToastContainer autoClose={1500} />
                            <div className={classes['upper-element']} style={{ textAlign: 'left' }}>
                                <span className={classes['title']}>Add product</span>
                                <span>Products/Add product</span>
                            </div>
                            <br></br>
                            <br></br>
                            <AddProductForm
                                addProductForm={this.state.addProductForm}
                                addProductHandler={this.addProductHandler}
                                inputChangedHandler={this.inputChangedHandler}
                                closeFormHandler={this.closeFormHandler}
                            />
                        </React.Fragment>
                        : <React.Fragment>
                            <h1>This is a list of all products seller can see</h1>
                            <button onClick={this.openFormHandler}>Add Product</button>
                        </React.Fragment>
                }

            </React.Fragment>
        );
    }
}

export default Products;
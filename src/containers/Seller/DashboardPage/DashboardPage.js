import React from 'react';
import classes from './DashboardPage.module.css';
import SellerDashboardListItem from '../../../components/UI/SellerDashboardListItem/';
import productIcon from '../../../assets/images/icons/products-dark.svg';
import orderIcon from '../../../assets/images/icons/orders-dark.svg';
import logo from '../../../assets/images/logo/logo.svg';
import InputAddProd from '../../../components/UI/InputAddProd';
import * as CommonConstants from '../../../constants/index';
import FlatButton from '../../../components/UI/FlatButton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

class DashboardLayout extends React.Component {
    state = {
        addProductForm: CommonConstants.ADD_PRODUCT_FORM_INIT,
        messageFromServer: ''
    }

    async inputChangedHandler (event, inputIndentifier) {
        const updatedAddProductForm = {
            ...this.state.addProductForm
        }
        const updatedFormElement = {
            ...updatedAddProductForm[inputIndentifier]
        }
        if (updatedFormElement.elementType === 'multi-select') {
            updatedFormElement.value = event.map(element => element.value);
        } else if (updatedFormElement.elementType === 'single-select' ) {
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
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    notify = (message, isSuccess) => {
        isSuccess ? toast.success(message) : toast.error(message);
    }

    componentDidMount () {
        console.log('DASHBOARD login ',this.props.sellerIsLogedIn);
        console.log('DASHBOARD checking', this.props.doneChecking);
        if (!this.props.sellerIsLogedIn && this.props.doneChecking) {
            this.props.history.replace('/seller');
        }
    }

    componentDidUpdate () {
        console.log('DASHBOARD login',this.props.sellerIsLogedIn);
        console.log('DASHBOARD checking', this.props.doneChecking);
        if (!this.props.sellerIsLogedIn && this.props.doneChecking) {
            this.props.history.replace('/seller');
        }
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
            <div className="container-fluid" style={{ backgroundColor: "#f6f6f6" }}>
                <ToastContainer autoClose={1500} />
                <div className="row">
                    <div className={classes['dashboard-left-side'] + " col-md-2 d-flex flex-column"}>
                        <div className="row">
                            <div className={classes['upper-element']}>
                                <Link to='/'>
                                    <img src={logo} alt="AWARE" />
                                </Link>
                            </div>
                            <SellerDashboardListItem src={productIcon}>Products</SellerDashboardListItem>
                            <SellerDashboardListItem src={orderIcon}>Orders</SellerDashboardListItem>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className={classes['upper-element']} style={{ textAlign: 'left' }}>
                            <span className={classes['title']}>Add product</span>
                            <span>Products/Add product</span>
                        </div>
                        <br></br>
                        <br></br>
                        <form onSubmit={this.addProductHandler}>
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
                                    <FlatButton type="button" backgroundColor="white">Cancel</FlatButton>
                                </div>
                                <div style={{ width: '180px' }}>
                                    <FlatButton backgroundColor="#ffa15f">Complete</FlatButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardLayout;
import React, { createContext } from 'react';
import * as CommonConstants from '../../constants/index';
import Modal from '../../components/UI/Modal/Modal';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LogInForm from '../../components/LogInForm/LogInForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import Footer from '../../components/Footer';
import Products from '../../components/Products';
import Cart from '../../components/Cart/Cart';

export const AppContext = createContext();
class HomePage extends React.Component {

    state = {
        spinnerLoadingCounter: 0,
        modalOpen: false,
        typeOfForm: '',
        currentUser: {
            id: '',
            isSeller: false,
            name: '',
            email: ''
        },
        isLogedIn: false,
        productsInCart: [],
        isEditting: false,
        indexOfEdittingCartItem: -1
    }

    async componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState((prevState, props) => {
                return {
                    spinnerLoadingCounter: prevState.spinnerLoadingCounter + 1
                }
            });
            const res = axios.get('http://localhost:5000/api/users/me', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            this.setState((prevState, props) => {
                return {
                    spinnerLoadingCounter: prevState.spinnerLoadingCounter - 1
                }
            });
            const response = await res;
            if (response) {
                this.setState({
                    isLogedIn: true,
                    currentUser: {
                        id: response.data._id,
                        isSeller: response.data.isSeller,
                        name: response.data.name,
                        email: response.data.email
                    }
                });
            }
        }
        const productsInCart = JSON.parse(localStorage.getItem('cart'));
        if (productsInCart && productsInCart.length) {
            await this.setState({
                productsInCart: productsInCart
            });
        }
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

    changeFormHandler(typeOfForm) {
        this.setState({
            typeOfForm: typeOfForm
        });
    }

    notify = (message, isSuccess) => {
        isSuccess ? toast.success(message) : toast.error(message);
    }

    storeToken = async (token) => {
        localStorage.setItem("token", token);
        const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response) {
            this.setState({
                isLogedIn: true,
                currentUser: {
                    id: response.data._id,
                    isSeller: response.data.isSeller,
                    name: response.data.name,
                    email: response.data.email
                }
            });
        }
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.setState({
            currentUser: {},
            isLogedIn: false
        });
    }

    updateUserInfo = (newUserInfo) => {
        this.setState({
            currentUser: {
                email: newUserInfo.email ? newUserInfo.email : this.state.currentUser.email,
                name: newUserInfo.name ? newUserInfo.name : this.state.currentUser.name
            }
        });
    }

    addProductToLocalStorageHandler = async (product) => {
        const productsInCart = [...this.state.productsInCart];
        product.amount = product.productPrice * product.chosenQuantity;
        productsInCart.unshift(product);
        await this.setState({
            productsInCart: productsInCart
        });
        localStorage.setItem('cart', JSON.stringify(this.state.productsInCart));
        this.notify("Product added to cart", true);
    }

    removeProductToLocalStorageHandler = async (index) => {
        const productsInCart = [...this.state.productsInCart];
        productsInCart.splice(index, 1);
        await this.setState({
            productsInCart: productsInCart
        });
        localStorage.setItem('cart', JSON.stringify(this.state.productsInCart));
        console.log(JSON.parse(localStorage.getItem('cart')));
    }

    turnOnEditing = (index) => {
        this.setState({
            indexOfEdittingCartItem: index,
            isEditting: true
        });
        const id = this.state.productsInCart[index].productID;
        this.props.history.push(`/products/${id}`);
    }

    turnOffEditing = () => {
        this.setState({
            indexOfEdittingCartItem: -1,
            isEditting: false
        });
    }

    editProductToLocalStorageHandler = async (product) => {
        const productsInCart = [...this.state.productsInCart];
        product.amount = product.productPrice * product.chosenQuantity;
        const { indexOfEdittingCartItem } = this.state;
        productsInCart[indexOfEdittingCartItem] = product;
        await this.setState({
            productsInCart: productsInCart
        });
        localStorage.setItem('cart', JSON.stringify(this.state.productsInCart));
        this.turnOffEditing();
        this.notify("Cart item changed", true);
        this.props.history.push('/cart');
    }

    decreaseQuantityOfProductInCart = (i) => {
        if (this.state.productsInCart[i].chosenQuantity - 1 > 0) {
            const productsInCart = [...this.state.productsInCart];
            productsInCart[i].chosenQuantity = productsInCart[i].chosenQuantity - 1;
            productsInCart[i].amount = productsInCart[i].chosenQuantity * productsInCart[i].productPrice;
            this.setState({
                productsInCart: productsInCart
            });
        }
    }

    increaseQuantityOfProductInCart = (i) => {
        if (this.state.productsInCart[i].chosenQuantity + 1 <= this.state.productsInCart[i].productRemain) {
            const productsInCart = [...this.state.productsInCart];
            productsInCart[i].chosenQuantity = productsInCart[i].chosenQuantity + 1;
            productsInCart[i].amount = productsInCart[i].chosenQuantity * productsInCart[i].productPrice;
            this.setState({
                productsInCart: productsInCart
            });
        }
    }

    createOrderHandler = async () => {
        const order = {
            customerID: this.state.currentUser.id,
            orderedProducts: this.state.productsInCart,
            status: 'pending'
        };
        const response = await axios.post('http://localhost:5000/api/orders', order, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            this.notify('Order created', true);
            this.setState({
                productsInCart: []
            });
            localStorage.removeItem('cart');
        } else {
            this.notify(response.data, false);
        }
    }

    render() {
        return (
            <React.Fragment>
                <AppContext.Provider
                    value={{
                        isEditting: this.state.isEditting,
                        indexOfEdittingCartItem: this.state.indexOfEdittingCartItem,
                        turnOnEditing: this.turnOnEditing,
                        turnOffEditing: this.turnOffEditing,
                        editProductToLocalStorageHandler: this.editProductToLocalStorageHandler,
                        removeProductToLocalStorageHandler: this.removeProductToLocalStorageHandler,
                        isLogedIn: this.state.isLogedIn,
                        createOrderHandler: this.createOrderHandler,
                        openLogInFormHandler: this.openLogInFormHandler,
                        productsInCart: this.state.productsInCart,
                        increaseQuantityOfProductInCart: this.increaseQuantityOfProductInCart,
                        decreaseQuantityOfProductInCart: this.decreaseQuantityOfProductInCart,
                        amountOfProductsInCart: this.state.productsInCart.length,
                        addProductToCartHandler: this.addProductToLocalStorageHandler
                    }}
                >
                    <Spinner display={this.state.spinnerLoadingCounter !== 0 ? 'block' : 'none'} />
                    <Header
                        isLogedIn={this.state.isLogedIn}
                        registerButtonClicked={this.openRegisterFormHandler}
                        logInButtonClicked={this.openLogInFormHandler}
                        logOutButtonClicked={this.logOut}
                        currentUserEmail={this.state.currentUser.email}
                    />
                    <ToastContainer autoClose={1500} />

                    {/*above are common components*/}

                    <div className="container">
                        <div className="row mt-5">
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route
                                    path="/profile"
                                    render={() => <Profile
                                        isLogedIn={this.state.isLogedIn}
                                        userName={this.state.currentUser.name}
                                        userEmail={this.state.currentUser.email}
                                        userUpdated={(newUserInfo) => { this.updateUserInfo(newUserInfo) }}
                                        history={this.props.history}
                                    />}
                                />
                                <Route path="/products" component={Products} />
                                <Route path="/cart" component={Cart} />
                                <Redirect from="/" to="/dashboard" />
                            </Switch>
                        </div>
                    </div>
                    {
                        this.state.modalOpen ?
                            <Modal show={this.state.modalOpen} closeModal={this.formCloseHandler}>
                                {
                                    this.state.typeOfForm === CommonConstants.FORM_TYPES.register ?
                                        <RegisterForm changeForm={() => this.changeFormHandler(CommonConstants.FORM_TYPES.normalLogIn)} />
                                        : this.state.typeOfForm === CommonConstants.FORM_TYPES.normalLogIn ?
                                            <LogInForm
                                                changeForm={() => this.changeFormHandler(CommonConstants.FORM_TYPES.register)}
                                                logInNotify={this.notify}
                                                closeModal={this.formCloseHandler}
                                                token={this.storeToken}
                                            />
                                            : null
                                }
                            </Modal>
                            : null
                    }
                    <Footer />
                </AppContext.Provider>
            </React.Fragment >
        );
    }
}

export default HomePage;
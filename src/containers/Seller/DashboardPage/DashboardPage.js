import React from 'react';
import classes from './DashboardPage.module.css';
import SellerDashboardListItem from '../../../components/UI/SellerDashboardListItem/';
import productIcon from '../../../assets/images/icons/products-dark.svg';
import orderIcon from '../../../assets/images/icons/orders-dark.svg';
import logo from '../../../assets/images/logo/logo.svg';
import InputAddProd from '../../../components/UI/InputAddProd';
import * as CommonConstants from '../../../constants/index'; 

class DashboardLayout extends React.Component {

    state = {
        addProductForm: CommonConstants.ADD_PRODUCT_FORM_INIT,
        messageFromServer: ''
    }

    inputChangedHandler (event, inputIndentifier) {

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
                <div className="row">
                    <div className={classes['dashboard-left-side'] + " col-md-2 d-flex flex-column"}>
                        <div className="row">
                            <div className={classes['upper-element']}>
                                <img src={logo} alt="AWARE" />
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
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardLayout;
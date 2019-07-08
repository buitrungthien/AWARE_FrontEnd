export const CHANGE_INFO_FORM_INIT = {
    name: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your name...",
            type: 'text',
        },
        label: 'NAME',
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 50
        },
        valid: true,
        touched: false,
        errorValidationMessage: ''
    },
    email: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your email...",
            type: 'email',
        },
        label: 'E-MAIL',
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 255
        },
        valid: true,
        touched: false,
        errorValidationMessage: ''
    }
}

export const CATEGORY_LIST = [
    { name: "Men" },
    { name: "Ladies" },
    { name: "Girls" },
    { name: "Boys" },
];

export const SELLER_DASHBOARD_LEFT_ITEMS = [
    { name: 'overview' },
    { name: 'orders' },
    { name: 'products' },
    { name: 'payments' },
    { name: 'promotions' },
    { name: 'setting' }
];

export const FORM_TYPES = {
    register: 'register',
    normalLogIn: 'normal-login',
    sellerLogIn: 'seller-login'
};

export const REGISTER_FORM_INIT = {
    name: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your name...",
            type: 'text',
        },
        label: 'NAME',
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 50
        },
        valid: false,
        touched: false,
        errorValidationMessage: ''
    },
    email: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your email...",
            type: 'email',
        },
        label: 'E-MAIL',
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 255
        },
        valid: false,
        touched: false,
        errorValidationMessage: ''
    },
    password: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your password...",
            type: 'password',
        },
        label: 'PASSWORD',
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 1024
        },
        valid: false,
        touched: false,
        errorValidationMessage: ''
    }
};

export const LOGIN_FORM_INIT = {
    email: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your email...",
            type: 'email',
        },
        label: 'E-MAIL',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your password...",
            type: 'password',
        },
        label: 'PASSWORD',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
};
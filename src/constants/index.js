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
        value: ''
    },
    email: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your email...",
            type: 'email',
        },
        label: 'E-MAIL',
        value: ''
    },
    password: {
        elementType: 'input',
        elementConfig: {
            placeholder: "Enter your password...",
            type: 'password',
        },
        label: 'PASSWORD',
        value: ''
    }
};
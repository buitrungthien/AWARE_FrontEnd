
export const CATEGORIES = [
    { name: 'All' },
    { name: 'Casual' },
    { name: 'Going out' },
    { name: 'Party' },
    { name: 'Ocassion' },
    { name: 'Mini' },
    { name: 'Maxi' },
    { name: 'Sets' }
];

export const MAX_QUANTITY_OF_IMAGES_PER_PRODUCT = 4;

export const ADD_PRODUCT_FORM_INIT = {
    name: {
        elementType: 'input',
        label: 'NAME',
        value: ''
    },
    categories: {
        elementType: 'multi-select',
        label: 'CATEGORIES',
        value: [],
        selectOptions: [
            { label: 'Men', value: 'men' },
            { label: 'Ladies', value: 'ladies' },
            { label: 'Girls', value: 'girls' },
            { label: 'Boys', value: 'boys' },
            { label: 'Tops', value: 'tops' },
            { label: 'Bottoms', value: 'bottoms' },
            { label: 'Dresses', value: 'dresses' },
            { label: 'Jackets', value: 'jackets' },
            { label: 'Shoes', value: 'shoes' },
            { label: 'Accesories', value: 'accesories' },
            { label: 'Sale', value: 'sale' },
            { label: 'Casual', value: 'casual'},
            { label: 'Going out', value: 'going out'},
            { label: 'Party', value: 'party'},
            { label: 'Ocassion', value: 'ocassion'},
            { label: 'Mini', value: 'mini'},
            { label: 'Maxi', value: 'maxi'},
            { label: 'Sets', value: 'sets'}
        ]
    },
    brand: {
        elementType: 'input',
        label: 'BRAND',
        value: ''
    },
    price: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
        },
        label: 'PRICE ($)',
        value: ''
    },
    sizes: {
        elementType: 'multi-select',
        label: 'SIZES',
        value: [],
        selectOptions: [
            { label: 'S', value: 'S' },
            { label: 'M', value: 'M' },
            { label: 'L', value: 'L' },
            { label: 'XL', value: 'XL' },
        ]
    },
    colors: {
        elementType: 'multi-select',
        label: 'COLORS',
        value: [],
        selectOptions: [
            { label: 'Red', value: 'red' },
            { label: 'Orange', value: 'orange' },
            { label: 'Blue', value: 'blue' },
            { label: 'Pink', value: 'pink' },
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
        ]
    },
    quantity: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
        },
        label: 'QUANTITY',
        value: '',
    },
    description: {
        elementType: 'textarea',
        label: 'DESCRIPTION',
        value: '',
    }
}

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
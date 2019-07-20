import React from 'react';
import classes from './Products.module.css';
import { CATEGORIES } from '../../constants/index';
import queryString from 'query-string';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import arrowIcon from '../../assets/images/icons/arrow.svg';
import ProductDetails from './ProductDetails';

class Products extends React.Component {

    state = {
        gender: '',
        subcategory: '',
        category: 'All',
        pageNumber: 1,
        products: [],
        totalPages: 1
    }

    categoryClickedHandler = async (categoryName) => {
        await this.setState({
            category: categoryName,
            pageNumber: 1
        });
        this.gettingProductsHandler();
    }

    pageIncreaseHandler = async () => {
        let pageNumber = this.state.pageNumber;
        if (pageNumber + 1 <= this.state.totalPages) {
            await this.setState({
                pageNumber: pageNumber + 1
            });
            this.gettingProductsHandler();
        }
    }

    pageDecreaseHandler = async () => {
        let pageNumber = this.state.pageNumber;
        if (pageNumber - 1 >= 1) {
            await this.setState({
                pageNumber: pageNumber - 1
            });
            this.gettingProductsHandler();
        }
    }

    gettingProductsHandler = async () => {
        const l_gender = this.state.gender.toLowerCase();
        const l_subcategory = this.state.subcategory.toLowerCase();
        const l_category = this.state.category.toLowerCase();
        const pageNumber = this.state.pageNumber;
        // calling API
        const response = await axios.get(`http://localhost:5000/api/products?gender=${l_gender}&subcategory=${l_subcategory}&category=${l_category}&pageNumber=${pageNumber}`);
        await this.setState({
            products: response.data.products,
            totalPages: response.data.totalPages
        });
    }

    componentWillMount = async () => {
        const gender = queryString.parse(this.props.location.search).gender ? queryString.parse(this.props.location.search).gender : '';
        const subcategory = queryString.parse(this.props.location.search).subcategory ? queryString.parse(this.props.location.search).subcategory : '';
        await this.setState({
            gender: gender,
            subcategory: subcategory
        });
        this.gettingProductsHandler();
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.location.search !== prevProps.location.search) {
            const gender = queryString.parse(this.props.location.search).gender ? queryString.parse(this.props.location.search).gender : '';
            const subcategory = queryString.parse(this.props.location.search).subcategory ? queryString.parse(this.props.location.search).subcategory : '';
            await this.setState({
                gender: gender ? gender : this.state.gender,
                subcategory: subcategory ? subcategory : this.state.subcategory
            });
            this.gettingProductsHandler();
        }
    }

    render() {
        const { gender } = this.state;
        const subcategory = this.state.subcategory ? this.state.subcategory : '';
        const categoryItem = CATEGORIES.map((item, i) => {
            const categoryListItemStyle = classes['category-list-item'] + ` ${this.state.category === item.name ? classes['active-category-list-item'] : ''}`;
            return (
                <Link
                    key={i}
                    to={{
                        pathname: '/products',
                        search: `?gender=${gender}&subcategory=${subcategory}&categories=${item.name}`
                    }}>
                    <li
                        onClick={() => this.categoryClickedHandler(item.name)}
                        className={categoryListItemStyle}>
                        {item.name + ' ' + subcategory}
                    </li>
                </Link>
            );
        });
        const subCategoryText = subcategory ? subcategory : 'All';

        const categoryText = gender ? `${gender}/${subCategoryText}` : null;

        const products = this.state.products.map((product, i) => {
            const price = product.price.toFixed(2);
            return (
                <div key={i} className={classes['product-box']}>
                    <div className={classes['img-frame']}>
                        <img className={classes['product-image']} src={`http://localhost:5000/${product.images[0]}`} alt="" />
                        <Link
                            to={{
                                pathname: `/products/${product['_id']}`
                            }}>
                            <div className={classes['quick-shop']}>
                                + Quick shop
                            </div>
                        </Link>
                    </div>
                    <p className={classes['product-name']}>{`${product.name} ${subcategory}`}</p>
                    <p className={classes['price']}>${price}</p>
                </div>
            );
        });

        const allProducts =
            <React.Fragment>
                <div className="col-md-2">
                    <strong>Category</strong>
                    <ul className={classes['category-list']}>
                        {categoryItem}
                    </ul>
                </div>
                {
                    !products.length ?
                        <h6 className={classes['no-result']}>No result found</h6>
                        :
                        <div className="col-md-10">
                            <div className="row" style={{ marginBottom: '10px' }}>
                                <div className="col-md-12" style={{ position: 'relative' }}>
                                    <div className={classes['twenty-p-element-upper']} style={{ display: 'inline-block' }}>
                                        Sort dropdown button
                                        </div>
                                    <div className={classes['twenty-p-element-upper']} style={{ display: 'inline-block', textAlign: 'right', float: 'right' }}>
                                        <img onClick={this.pageDecreaseHandler} className={classes['rotate-left']} src={arrowIcon} alt="" />
                                        {this.state.pageNumber}/{this.state.totalPages}
                                        <img onClick={this.pageIncreaseHandler} className={classes['rotate-right']} src={arrowIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between flex-wrap">
                                    {products}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12" style={{ position: 'relative' }}>
                                    <div className={classes['twenty-p-element-upper']} style={{ display: 'inline-block', textAlign: 'right', float: 'right' }}>
                                        <img onClick={this.pageDecreaseHandler} className={classes['rotate-left']} src={arrowIcon} alt="" />
                                        {this.state.pageNumber}/{this.state.totalPages}
                                        <img onClick={this.pageIncreaseHandler} className={classes['rotate-right']} src={arrowIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>

        return (
            <React.Fragment>
                <div className="col-md-12">
                    <span className={classes['category-text']}>{categoryText}</span>
                </div>
                <Switch>
                    <Route path="/products/:id" component={ProductDetails} />
                    <Route path="/products" render={() => allProducts} />
                </Switch>
            </React.Fragment>
        );
    };
};

export default Products;
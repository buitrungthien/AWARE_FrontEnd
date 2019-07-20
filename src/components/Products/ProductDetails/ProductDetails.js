import React from 'react';
import classes from './ProductDetails.module.css';
import { MAX_QUANTITY_OF_IMAGES_PER_PRODUCT } from '../../../constants/index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SizesBox from './SizesBox';
import ColorsBox from './ColorsBox';
import QuantityBox from './QuantityBox';
import FlatButton from '../../UI/FlatButton';
import { AppContext } from '../../../containers/HomePage/HomePage';

class ProductDetails extends React.Component {
    state = {
        product: { images: [], price: 0 },
        chosenImage: '',
        moreFrom: [],
        chosenSize: '',
        chosenColor: '',
        chosenQuantity: 1
    }

    componentWillMount = async () => {
        console.log('componentWillMount!!!');
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        await this.setState({
            product: response.data.product,
            chosenImage: response.data.product.images[0],
            moreFrom: response.data.moreFrom,
            chosenSize: response.data.product.sizes[0],
            chosenColor: response.data.product.colors[0]
        });
    }

    componentDidUpdate = async () => {
        const { id } = this.props.match.params;
        if (id !== this.state.product['_id']) {
            console.log('componentDidUpdate!!!');
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            await this.setState({
                product: response.data.product,
                chosenImage: response.data.product.images[0],
                moreFrom: response.data.moreFrom
            });
        }
    }

    setChosenImage(index) {
        this.setState({
            chosenImage: this.state.product.images[index]
        });
    }

    increaseQuantityHandler = () => {
        if (this.state.chosenQuantity + 1 <= this.state.product.remain) {
            this.setState((prevState, props) => {
                return {
                    chosenQuantity: prevState.chosenQuantity + 1
                }
            });
        }
    }

    decreaseQuantityHandler = () => {
        if (this.state.chosenQuantity - 1 > 0) {
            this.setState((prevState, props) => {
                return {
                    chosenQuantity: prevState.chosenQuantity - 1
                }
            });
        }
    }

    pickColorHandler = (color) => {
        this.setState({
            chosenColor: color
        });
    }

    choseSizeHandler = (size) => {
        this.setState({
            chosenSize: size
        });
    }

    render() {
        const smallImages = [];
        for (let i = 0; i < MAX_QUANTITY_OF_IMAGES_PER_PRODUCT; i++) {
            smallImages.push(
                <div key={i} className={classes['small-image-frame']} onClick={() => this.setChosenImage(i)}>
                    <img className={classes['small-image']} src={`http://localhost:5000/${this.state.product.images[i]}`} alt="" />
                </div>
            );
        }
        const moreFrom = this.state.moreFrom.map(product => {
            return (
                <Link
                    key={product['_id']}
                    to={{
                        pathname: `/products/${product['_id']}`
                    }}>
                    <div className={classes['small-image-frame']}>
                        <img className={classes['small-image']} src={`http://localhost:5000/${product.images[0]}`} alt="" />
                    </div>
                </Link>
            );
        });
        const { product, chosenImage } = this.state;
        const price = this.state.product.price.toFixed(2);

        return (
            <AppContext.Consumer>
                {cartContext => {
                    return (
                        <div className="col-md-12" style={{ marginTop: '32px' }}>
                            <div className="row">
                                <div className="col-md-1 d-flex flex-column">
                                    {smallImages}
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className={classes['big-image-frame']}>
                                                <img className={classes['big-image']} src={`http://localhost:5000/${chosenImage}`} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <span className={classes['product-name']}>{product.name}</span>
                                            <span className={classes['product-price']}>${price}</span>
                                            <div className={classes['outer-box']}>
                                                <SizesBox
                                                    sizes={product.sizes}
                                                    chosenSize={this.state.chosenSize}
                                                    onClick={this.choseSizeHandler} />
                                            </div>
                                            <div className={classes['outer-box']}>
                                                <ColorsBox
                                                    chosenColor={this.state.chosenColor}
                                                    colors={product.colors}
                                                    onClick={this.pickColorHandler} />
                                            </div>
                                            <div className={classes['outer-box']}>
                                                <QuantityBox
                                                    increase={this.increaseQuantityHandler}
                                                    decrease={this.decreaseQuantityHandler}
                                                    quantity={this.state.chosenQuantity}
                                                />
                                            </div>
                                            <div className={classes['outer-box']}>
                                                <FlatButton
                                                    backgroundColor="#5f6dff"
                                                    clicked={() => {
                                                        cartContext.addProductToCartHandler({
                                                            productImage: product.images[0],
                                                            productName: product.name,
                                                            productBrand: product.brand,
                                                            productPrice: product.price,
                                                            productRemain: product.remain,
                                                            productID: product._id,
                                                            chosenSize: this.state.chosenSize,
                                                            chosenColor: this.state.chosenColor,
                                                            chosenQuantity: this.state.chosenQuantity
                                                        })
                                                    }}
                                                >
                                                    Add to cart
                                                </FlatButton>
                                            </div>
                                            <br />
                                            <hr className={classes['hr']} />
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 d-flex flex-column">
                                    <p className={classes['more-from']}>More from</p>
                                    <p className={classes['brand']}>{product.brand}</p>
                                    {moreFrom}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </AppContext.Consumer>
        );
    }
};

export default ProductDetails;
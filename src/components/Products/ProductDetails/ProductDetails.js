import React from 'react';
import classes from './ProductDetails.module.css';
import { MAX_QUANTITY_OF_IMAGES_PER_PRODUCT } from '../../../constants/index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SizesBox from './SizesBox';
import ColorsBox from './ColorsBox';

class ProductDetails extends React.Component {
    state = {
        product: { images: [], price: 0 },
        chosenImage: '',
        moreFrom: []
    }

    componentWillMount = async () => {
        console.log('componentWillMount!!!');
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        await this.setState({
            product: response.data.product,
            chosenImage: response.data.product.images[0],
            moreFrom: response.data.moreFrom
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
                                <SizesBox sizes={product.sizes}/>
                                <ColorsBox colors={product.colors}/>
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
    }
};

export default ProductDetails;
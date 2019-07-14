import React from 'react';
import classes from './Products.module.css';
import AddProductForm from '../../../../components/AddProductForm';

class Products extends React.Component {
    state = {
        addingProduct: false
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
                            <div className={classes['upper-element']} style={{ textAlign: 'left' }}>
                                <span className={classes['title']}>Add product</span>
                                <span>Products/Add product</span>
                            </div>
                            <br></br>
                            <br></br>
                            <AddProductForm
                                closeFormHandler={this.closeFormHandler}
                            />
                        </React.Fragment>
                        : <React.Fragment>
                            <button onClick={this.openFormHandler}>Add Product</button>
                            <h1>This is a list of all products seller can see</h1>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default Products;
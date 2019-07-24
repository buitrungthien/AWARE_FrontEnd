import React from 'react';
import classes from './Products.module.css';
import AddProductForm from '../../../../components/AddProductForm';
import FlatButton from '../../../../components/UI/FlatButton';
import axios from 'axios';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Table } from 'reactstrap';
import dropdownIcon from '../../../../assets/images/icons/dropdown.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';
import removeIcon from '../../../../assets/images/icons/remove.svg';

class Products extends React.Component {
    state = {
        addingProduct: false,
        pageNumber: 1,
        pageSize: 10,
        products: [],
        totalPages: 1,
        numOfProducts: 0,
        dropdownOpen: false
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount = async () => {
        const { pageNumber, pageSize } = this.state;
        axios.get(`http://localhost:5000/api/products?category=all&pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(async res => {
                await this.setState({
                    products: res.data.products,
                    totalPages: res.data.totalPages,
                    numOfProducts: res.data.numOfProducts
                });
            })
    }

    openFormHandler = () => {
        this.setState({
            addingProduct: true
        });
        this.props.setTitle('addProduct');
    }

    closeFormHandler = () => {
        this.setState({
            addingProduct: false
        });
        this.props.setTitle('products');
    }

    async handleClick(e, pageNumber, pageSize) {
        e.preventDefault();
        await this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        });
        axios.get(`http://localhost:5000/api/products?category=all&pageSize=${pageSize}&pageNumber=${pageNumber}`)
            .then(async result => {
                await this.setState({
                    products: result.data.products,
                    numOfProducts: result.data.numOfProducts,
                    totalPages: result.data.totalPages
                });
                console.log(this.state.products, this.state.totalPages, this.state.numOfProducts);
            }, error => {
                console.log(error);
            })
    }

    capitalize(stringArray) {
        let result = stringArray.map(string =>
            string[0].toUpperCase() + string.substring(1)
        );
        return result = result.join(", ");
    }

    render() {
        const { pageNumber, pageSize, totalPages, numOfProducts, products } = this.state;
        const productElements = products.map(product => {
            product.createdDate = new Date(product.createdDate);
            return (
                <tr key={product._id}>
                    <td>
                        <div className="d-flex justify-content-start">
                            <div className={classes['product-image-frame']}>
                                <img src={`http://localhost:5000/${product.images[0]}`} alt="" />
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <span className={classes['product-name']}>{product.name}</span>
                                <span>
                                    <span className={classes['product-categories']}>{this.capitalize(product.categories)}</span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td><span className={classes['row-normal-text']}>{`${product.quantity - product.remain} / ${product.quantity}`}</span></td>
                    <td><span className={classes['row-normal-text']}>{product.createdDate.toDateString()}</span></td>
                    <td><span className={classes['row-normal-text']}>{((product.quantity - product.remain) * product.price).toFixed(2)}</span></td>
                    <td
                        className={classes['action-column']}
                        style={{ position: 'relative' }}>
                        Actions<img alt="" src={dropdownIcon} />
                        <div className={classes['action-box']}>
                            <div
                                className="d-flex justify-content-start align-items-center"
                                // onClick={() => this.changeOrderStatusHandler(order._id, "Completed")}
                            >
                                <img src={editIcon} alt="" style={{marginRight: "12px"}}/>
                                <span>Edit</span>
                            </div>
                            <div
                                className="d-flex justify-content-start align-items-center"
                                // onClick={() => this.changeOrderStatusHandler(order._id, "Canceled")}
                            >
                                <img src={removeIcon} alt="" style={{marginRight: "12px"}}/>
                                <span>Remove</span>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
        return (
            <React.Fragment>
                {
                    this.state.addingProduct ?
                        <AddProductForm
                            closeFormHandler={this.closeFormHandler}
                        />
                        : <React.Fragment>
                            <div style={{ display: 'inline-block', marginBottom: "20px" }}>
                                <FlatButton
                                    backgroundColor="#ffa15f"
                                    clicked={this.openFormHandler}
                                >
                                    + Add Product
                                </FlatButton>
                            </div>
                            <div className={classes['table-outer-box']}>
                                <Table striped borderless>
                                    <thead>
                                        <tr>
                                            <th>PRODUCTS</th>
                                            <th>SOLD</th>
                                            <th>DATE ADDED</th>
                                            <th>PROFIT ($)</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td colSpan="6" style={{ padding: 0 }}><hr /></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productElements}
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between align-items-baseline" style={{ marginTop: "20px" }}>
                                    <span className={classes['amount-info']}>Show {(pageNumber - 1) * pageSize + 1} to {products.length + (pageNumber - 1) * pageSize} of {numOfProducts} entries</span>
                                    <div className={classes['pagination-wrapper']}>
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                            <DropdownToggle caret color="normal">
                                                {this.state.pageSize}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={(e) => this.handleClick(e, pageNumber, 5)}>5</DropdownItem>
                                                <DropdownItem onClick={(e) => this.handleClick(e, pageNumber, 10)}>10</DropdownItem>
                                                <DropdownItem onClick={(e) => this.handleClick(e, pageNumber, 20)}>20</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        <Pagination aria-label="Page navigation example">
                                            <PaginationItem disabled={pageNumber <= 1}>
                                                <PaginationLink
                                                    onClick={e => this.handleClick(e, pageNumber - 1, pageSize)}
                                                    previous
                                                    href="#"
                                                />
                                            </PaginationItem >
                                            {[...Array(totalPages)].map((page, i) =>
                                                <PaginationItem active={i + 1 === pageNumber} key={i}>
                                                    <PaginationLink onClick={e => this.handleClick(e, i + 1, pageSize)} href="#">
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )}
                                            <PaginationItem disabled={pageNumber >= totalPages}>
                                                <PaginationLink
                                                    onClick={e => this.handleClick(e, pageNumber + 1, pageSize)}
                                                    next
                                                    href="#"
                                                />
                                            </PaginationItem>
                                        </Pagination>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default Products;
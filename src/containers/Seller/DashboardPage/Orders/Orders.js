import React from 'react';
import { Table } from 'reactstrap';
import classes from './Orders.module.css';
import axios from 'axios';
import dropdownIcon from '../../../../assets/images/icons/dropdown.svg'

class Orders extends React.Component {
    state = {
        orders: [],
        pageNumber: 1,
        pageSize: 10,
        numOfOrders: 0,
        totalPages: 1
    }

    componentDidMount = async () => {
        if (this.props.match.url === "/seller/dashboard/orders") {
            const { pageSize, pageNumber } = this.state;
            axios.get(`http://localhost:5000/api/orders?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
                .then(async result => {
                    await this.setState({
                        orders: result.data.orders,
                        numOfOrders: result.data.numOfOrders,
                        totalPages: result.data.totalPages
                    });
                }, error => {
                    console.log(error);
                })
        }
    }

    changeOrderStatusHandler = async (id, status) => {
        status = status.toLowerCase();
        await axios.patch(`http://localhost:5000/api/orders?orderID=${id}&changedStatus=${status}`);
        let orders = [ ...this.state.orders ];
        let changedOrderIndex = orders.findIndex(order => order._id === id);
        console.log(changedOrderIndex);
        orders[changedOrderIndex].status = status;
        console.log(orders[changedOrderIndex].status);
        this.setState({
            orders: orders
        });
    }

    render() {
        const { orders } = { ...this.state };
        const orderElements = orders.map(order => {
            const statusText = order.status === 'pending' ? "pending" : order.status === 'canceled' ? "canceled" : "completed";
            const statusColor = order.status === 'pending' ? "#fbba4e" : order.status === 'canceled' ? "#f05d62" : "#82bf11";
            const status = <div className={classes['status-outer-box']} style={{ backgroundColor: statusColor }}>{statusText}</div>
            return (
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderedDate}</td>
                    <td>{order.orderedItem.productName} ({order.orderedItem.chosenSize}) x {order.orderedItem.chosenQuantity}</td>
                    <td>{order.orderedItem.amount}</td>
                    <td>{status}</td>
                    <td
                        className={classes['action-column']}
                        style={{ position: 'relative' }}>
                        Actions<img alt="" src={dropdownIcon} />
                        <div className={classes['action-box']}>
                            <div
                                className="d-flex justify-content-start align-items-center"
                                onClick={() => this.changeOrderStatusHandler(order._id, "Completed")}
                            >
                                <div className={classes['green-dot']}></div>
                                <span>Mark as Completed</span>
                            </div>
                            <div
                                className="d-flex justify-content-start align-items-center"
                                onClick={() => this.changeOrderStatusHandler(order._id, "Canceled")}
                            >
                                <div className={classes['red-dot']}></div>
                                <span>Mark as Canceled</span>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <div className={classes['table-outer-box']}>
                <Table striped borderless>
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>ORDERED DATE</th>
                            <th>DETAIL</th>
                            <th>TOTAL ($)</th>
                            <th>STATUS</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td colSpan="6" style={{ padding: 0 }}><hr /></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderElements}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Orders;
import React from 'react';
import classes from './SellerDashboardListItem.module.css';

const sellerDashboardListItem = (props) => (
    <div className={classes['outer-box'] + " d-flex justify-content-start align-items-center"}>
        <img alt="" src={props.src} style={{marginRight: "20px"}}></img>
        <span>{props.children}</span>
    </div>
);

export default sellerDashboardListItem;
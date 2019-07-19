import React from 'react';
import classes from './NotificationBadge.module.css';

const notificationBadge = (props) => {

    return (
        <div className={classes['notification-outer-box']} onClick={props.clicked}>
            <img src={props.src} className={classes['notification-image']} alt=""/>
            <div className={classes['notification-number']}>{props.amount}</div>
        </div>
    );
}

export default notificationBadge;
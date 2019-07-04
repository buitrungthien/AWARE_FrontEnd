import React from 'react';
import classes from './ListItems.module.css';
import * as CONSTANT from '../../../../constant/index';

const listItems = (props) => {

    const allItems = CONSTANT.SELLER_DASHBOARD_LEFT_ITEMS.map(item => {
        return (
            <div className={classes.Item}>
                <button>{item.name}</button>
            </div>
        );
    });

    return (
        <div className={classes.ListItems}>
            {allItems}
        </div>
    );
}

export default listItems;
import React from 'react';
import classes from './QuantityBox.module.css';
import minusIcon from '../../../../assets/images/icons/minus.svg';
import plusIcon from '../../../../assets/images/icons/plus.svg';

const quantityBox = (props) => {

    return (
        <div className={`d-flex justify-content-start align-items-center ${classes['outer-box']}`}>
            <label className={classes['label']}>
                Quantity
            </label>
            <div className={classes['quantity-control-box']}>
                <img className={classes['quantity-control-icon']} src={minusIcon} alt="" onClick={props.decrease} />
                {props.quantity}
                <img className={classes['quantity-control-icon']} src={plusIcon} alt="" onClick={props.increase} />
            </div>
        </div>
    );
}

export default quantityBox;
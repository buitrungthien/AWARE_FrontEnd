import React from 'react';
import classes from './FlatButton.module.css';

const flatButton = (props) => {

    return (
        <div className={classes['outer-box']}>
            <button className={classes['flat-button']} style={{backgroundColor: props.backGroundColor }}>
                {props.children}
            </button>
        </div>
    );
};

export default flatButton;
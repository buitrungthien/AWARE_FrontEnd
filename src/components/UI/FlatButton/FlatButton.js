import React from 'react';
import classes from './FlatButton.module.css';

const flatButton = (props) => {

    return (
        <div className={classes['outer-box']}>
            <button
                type={props.type}
                disabled={props.disabled}
                onClick={props.clicked}
                className={classes['flat-button']}
                style={{ backgroundColor: props.backgroundColor, color: props.backgroundColor === 'white' ? '#ffa15f' : null }}>
                {props.children}
            </button>
        </div>
    );
};

export default flatButton;
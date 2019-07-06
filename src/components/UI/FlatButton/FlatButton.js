import React from 'react';
import classes from './FlatButton.module.css';

const flatButton = (props) => {

    return (
        <div className={classes['outer-box']}>
            <button 
                disabled={props.disabled} 
                className={classes['flat-button']} 
                style={{backgroundColor: props.backGroundColor}}>
                {props.children}
            </button>
        </div>
    );
};

export default flatButton;
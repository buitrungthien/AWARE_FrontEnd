import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div style={{display: props.display, backgroundColor: 'black', position: 'fixed', width: '100%', height: '100%', zIndex: 1000}}>
        <div className={classes.loader}>
            Loadding...
        </div>
    </div>
);

export default spinner;
import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={classes.loader} style={{display: props.display}}>
        Loadding...
    </div>
);

export default spinner;
import React from 'react';
import classes from './InfoElement.module.css';

const infoElement = (props) => (
    <div className={classes['info-box']}>
        <label className={classes['label']}>{props.label}</label>
        <span>{props.children}</span>
    </div>
);

export default infoElement;
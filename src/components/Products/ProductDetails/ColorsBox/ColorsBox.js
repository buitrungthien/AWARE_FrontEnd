import React from 'react';
import classes from './ColorsBox.module.css';

const colorsBox = (props) => {
    let colorsBoxes = [];
    if (props.colors) {
        colorsBoxes = props.colors.map(color => {
            return (
                <div key={color} className={classes['color-box']} style={{backgroundColor: color}}>
                </div>
            );
        });
    }
    return (
        <div>
            <label className={classes['label']}>Color</label>
            <div className="d-flex justify-content-start">
                {colorsBoxes}
            </div>
        </div>
    );
};

export default colorsBox;
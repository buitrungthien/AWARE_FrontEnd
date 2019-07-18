import React from 'react';
import classes from './SizesBox.module.css';

const sizesBox = (props) => {
    let sizesBoxes = [];
    if (props.sizes) {
        sizesBoxes = props.sizes.map(size => {
            return (
                <div key={size} className={classes['size-box']}>
                    {size}
                </div>
            );
        });
    }
    return (
        <div>
            <label className={classes['label']}>Size</label>
            <div className="d-flex justify-content-start">
                {sizesBoxes}
            </div>
        </div>
    );
};

export default sizesBox;
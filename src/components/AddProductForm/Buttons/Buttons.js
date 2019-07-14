import React from 'react';
import classes from './Buttons.module.css';
import addIcon from '../../../assets/images/icons/add.svg';
import closeIcon from '../../../assets/images/icons/close-1.svg';
import { MAX_QUANTITY_OF_IMAGES_PER_PRODUCT } from '../../../constants/index';

const buttons = (props) => {
    let imageUpload = [];
    for (let i = 0; i < MAX_QUANTITY_OF_IMAGES_PER_PRODUCT; i++) {
        imageUpload.push(
            <div className={classes['outer-box']} key={i}>
                <label htmlFor={`single1${i}`} className={classes['label']}>
                    <img src={addIcon} alt="" className={classes['img']} />
                    Add photo
                    </label>
                <input type='file' id={`single1${i}`} onChange={props.onChange} className={classes['input']} />
                {props.productImages[i] ? <img src={'http://localhost:5000/' + props.productImages[i]} alt="" className={classes['clothe-image']} /> : null}
                {props.productImages[i] ? <img src={closeIcon} onClick={() => props.onDelete(i, props.productImages[i])} alt="" className={classes['close-icon']} /> : null}
            </div>
        );
    }

    return (
        <div className={classes['box-four-buttons']}>
            <div style={{
                width: '80%',
                float: 'right',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                {imageUpload}
            </div>
        </div >
    );
}

export default buttons;

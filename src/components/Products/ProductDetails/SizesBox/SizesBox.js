import React from 'react';
import classes from './SizesBox.module.css';

class SizesBox extends React.Component {
    choseSizeHandler(size) {
        this.props.onClick(size);
    }

    render() {
        let sizesBoxes = [];
        if (this.props.sizes) {
            sizesBoxes = this.props.sizes.map(size => {
                const isChosen = this.props.chosenSize === size;
                return (
                    <div 
                        key={size} 
                        className={classes['size-box']}
                        style={{
                            color: isChosen ? 'white' : '',
                            backgroundColor: isChosen ? '#ffa15f' : ''
                            }}
                        onClick={() => this.choseSizeHandler(size)}>
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
    }
};

export default SizesBox;
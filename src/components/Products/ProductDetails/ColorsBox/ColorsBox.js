import React from 'react';
import classes from './ColorsBox.module.css';

class ColorsBox extends React.Component {
    pickColorHandler = (color) => {
        this.props.onClick(color);
    }

    render() {
        let colorsBoxes = [];
        if (this.props.colors) {
            colorsBoxes = this.props.colors.map(color => {
                const isChosen = this.props.chosenColor === color;
                return (
                    <div
                        key={color}
                        className={classes['color-box']}
                        style={{ backgroundColor: color, border: isChosen ? 'solid 3px orangered' : ''}}
                        onClick={() => this.pickColorHandler(color)}>
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
    }
};

export default ColorsBox;
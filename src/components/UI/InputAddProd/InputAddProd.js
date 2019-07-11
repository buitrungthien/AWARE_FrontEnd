import React from 'react';
import classes from './InputAddProd.module.css';
import Select from 'react-select';

const inputAddProd = (props) => {
    let inputElement = null;
    const inputClasses = [classes['input-element']];

    switch (props.elementType) {
        case ('single-select'):
            inputElement =
                <div className={inputClasses.join(' ')} style={{ padding: 0, border: 'none' }}>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        options={props.selectOptions}
                        onChange={props.changed}
                    />
                </div>
            break;
        case ('multi-select'):
            inputElement =
                <div className={inputClasses.join(' ')} style={{ padding: 0, border: 'none' }}>
                    <Select
                        isMulti
                        options={props.selectOptions}
                        classNamePrefix="select"
                        className="basic-multi-select"
                        onChange={props.changed}
                    />
                </div>;
            break;
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
    }

    return (
        <div className={classes['input']}>
            <label className={classes['label-item']}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default inputAddProd;
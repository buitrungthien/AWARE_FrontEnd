import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxxx from '../../../hoc/Auxxx/Auxxx';

const modal = (props) => {
    return (
        <Auxxx>
            <Backdrop show={props.show} clicked={props.closeForm}/>
            <div className={classes['modal']}>
                {props.children}
            </div>
        </Auxxx>
    );
}

export default modal;
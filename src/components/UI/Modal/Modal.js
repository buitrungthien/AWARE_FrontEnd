import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxxx from '../../../hoc/Auxxx/Auxxx';
import CloseIcon from '../../../assets/images/icons/cross.svg';

const modal = (props) => {
    return (
        <Auxxx>
            <Backdrop show={props.show} clicked={props.closeModal}/>
            <div className={classes['modal']}>
                <i onClick={props.closeModal} style={{float: 'right', padding: '10px'}}>
                    <img src={CloseIcon} alt=""></img>
                </i>
                {props.children}
            </div>
        </Auxxx>
    );
}

export default modal;
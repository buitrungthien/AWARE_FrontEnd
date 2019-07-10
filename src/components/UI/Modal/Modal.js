import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import CloseIcon from '../../../assets/images/icons/cross.svg';

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.closeModal}/>
            <div className={classes['modal']}>
                <i style={{float: 'right', padding: '10px'}}>
                    <img onClick={props.closeModal} src={CloseIcon} alt="" style={{cursor: 'pointer'}}></img>
                </i>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default modal;
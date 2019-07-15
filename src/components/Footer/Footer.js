import React from 'react';
import classes from './Footer.module.css';
import logo from '../../assets/images/logo/logo.svg';
import twitter from '../../assets/images/icons/twitter-icon.svg';
import facebook from '../../assets/images/icons/facebook-icon.svg';
import instagram from '../../assets/images/icons/instagram-6-icon.svg';
import { Link } from 'react-router-dom';

const footer = (props) => (
    <div className={classes['footer']}>
        <div className="container" style={{ padding: '52px 0', borderBottom: 'solid 1px lightgray' }}>
            <div className="row">
                <div className="col-md-3">
                    <Link to='/'><img src={logo} alt='' /></Link>
                </div>
                <div className="col-md-6">
                    <ul className={classes['list']}>
                        <Link to="/"><li className={classes['list-item']}>Home</li></Link>
                        <li className={classes['list-item']}>Products</li>
                        <li className={classes['list-item']}>Services</li>
                        <li className={classes['list-item']}>About Us</li>
                        <li className={classes['list-item']}>Help</li>
                        <li className={classes['list-item']}>Contacts</li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <ul className={classes['society-list']}>
                        <li className={classes['society-list-item']}><img src={twitter} alt='' /></li>
                        <li className={classes['society-list-item']}><img src={facebook} alt='' /></li>
                        <li className={classes['society-list-item']}><img src={instagram} alt='' /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <ul className={classes['list']}>
                            <Link to="/"><li className={classes['list-item'] + ' ' + classes['small']}>Home</li></Link>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Products</li>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Services</li>
                            <li className={classes['list-item'] + ' ' + classes['small']}>About Us</li>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Help</li>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Contacts</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='row d-flex justify-content-end'>
                        <ul className={classes['list']}>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Privte Policy</li>
                            <li className={classes['list-item'] + ' ' + classes['small']}>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default footer;
import React from 'react';
import classes from './Dashboard.module.css';
import mainImage from '../../assets/backgroundImages/customer-dashboard/main-image.jpg';
import menImage from '../../assets/backgroundImages/customer-dashboard/men.jpg';
import ladiesImage from '../../assets/backgroundImages/customer-dashboard/ladies.jpg';
import girlsImage from '../../assets/backgroundImages/customer-dashboard/girls.jpg';
import boysImage from '../../assets/backgroundImages/customer-dashboard/boys.jpg';
import { Link } from 'react-router-dom';
import FlatButton from '../UI/FlatButton';

const dashboard = (props) => (
    <React.Fragment>
        <div className='col-md-12' style={{ positon: 'relative' }}>
            <span className={classes['text-main-image']}>OUTFIT OF THE WEEK</span>
            <img src={mainImage} alt='' className={classes['main-image']} />
            <div className={classes['button-main-image']}>
                <Link
                    to={{
                        pathname: '/products'
                    }}>
                    <FlatButton backgroundColor='#ffa15f'>Shop now</FlatButton>
                </Link>
            </div>
        </div>

        <div className='col-md-3' style={{ position: 'relative', height: '405px', marginTop: '19px' }}>
            <img className={classes['sub-image']} src={menImage} alt='' />
            <span className={classes['gender']}>Men</span>
            <div className={classes['button-outer-box']}>
                <div className={classes['button-sub-image']}>
                    <Link
                        to={{
                            pathname: '/products',
                            search: '?gender=Men'
                        }}>
                        <FlatButton backgroundColor='#ffa15f'>Shop now</FlatButton>
                    </Link>
                </div>
            </div>
        </div>
        <div className='col-md-3' style={{ position: 'relative', height: '405px', marginTop: '19px' }}>
            <img className={classes['sub-image']} src={ladiesImage} alt='' />
            <span className={classes['gender']}>Ladies</span>
            <div className={classes['button-outer-box']}>
                <div className={classes['button-sub-image']}>
                    <Link
                        to={{
                            pathname: '/products',
                            search: '?gender=Ladies'
                        }}>
                        <FlatButton backgroundColor='#ffa15f'>Shop now</FlatButton>
                    </Link>
                </div>
            </div>
        </div>
        <div className='col-md-3' style={{ position: 'relative', height: '405px', marginTop: '19px' }}>
            <img className={classes['sub-image']} src={girlsImage} alt='' />
            <span className={classes['gender']}>Girls</span>
            <div className={classes['button-outer-box']}>
                <div className={classes['button-sub-image']}>
                    <Link
                        to={{
                            pathname: '/products',
                            search: '?gender=Girls'
                        }}>
                        <FlatButton backgroundColor='#ffa15f'>Shop now</FlatButton>
                    </Link>
                </div>
            </div>
        </div>
        <div className='col-md-3' style={{ position: 'relative', height: '405px', marginTop: '19px' }}>
            <img className={classes['sub-image']} src={boysImage} alt='' />
            <span className={classes['gender']}>Boys</span>
            <div className={classes['button-outer-box']}>
                <div className={classes['button-sub-image']}>
                    <Link
                        to={{
                            pathname: '/products',
                            search: '?gender=Boys'
                        }}>
                        <FlatButton backgroundColor='#ffa15f'>Shop now</FlatButton>
                    </Link>
                </div>
            </div>
        </div>

    </React.Fragment>
);

export default dashboard;
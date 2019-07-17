import React from 'react';
import arrow from '../../../assets/images/icons/arrow.svg';
import classes from './CategoryList.module.css';
import { Link } from 'react-router-dom';

const categoryList = (props) => {
    const genders = ['Men', 'Ladies', 'Girls', 'Boys'];
    const subCategories = [
        { name: 'Tops' },
        { name: 'Bottoms' },
        { name: 'Dresses' },
        { name: 'Jackets' },
        { name: 'Shoes' },
        { name: 'Accesories' },
        { name: 'Sale' }
    ];

    const categoryList = genders.map(gender => {
        const categoryListItem = subCategories.map((item, i) => {
            return (
                <Link
                    key={i}
                    to={{
                        pathname: '/products',
                        search: `?gender=${gender}&subcategory=${item.name}`
                    }}>
                    <li onClick={props.subCategoryClicked} className={classes['list-item']}>{item.name}</li>
                </Link>
            );
        });
        return (
            <span key={gender} className={classes['category-item']}>
                {gender}
                <img src={arrow} alt="" />
                <div className={classes['transparent-box']}>
                    <div className={classes['hover-block']}>
                        <ul className={classes['list']}>
                            {categoryListItem}
                        </ul>
                    </div>
                </div>
            </span>
        );
    });

    return (
        <div className={classes['category-box']}>
            <div className="col-md-4 offset-md-4 d-flex justify-content-around" style={{ position: 'relative' }}>
                {categoryList}
            </div>
        </div>
    );
};

export default categoryList;
import React from 'react';
import * as CommonConstants from '../../../constants/index';
import arrow from '../../../assets/images/icons/arrow.svg';
import classes from './CategoryList.module.css';

const categoryList = (props) => {
    const subCategoryList = [{ name: 'Tops' }, { name: 'Bottoms' }, { name: 'Dresses' }, { name: 'Jackets' }, { name: 'Shoes' }, { name: 'Accesories' }, { name: 'Sale' }];
    const categoryListItem = subCategoryList.map((item, i) => {
        return (
            <li onClick={props.subCategoryClicked} className={classes['list-item']}>{item.name}</li>
        );
    });
    const categoryList = CommonConstants.CATEGORY_LIST.map(category => {
        return (
            <span className={classes['category-item']} key={category.name}>
                {category.name}
                <img src={arrow} alt="" />
                <div className={classes['hover-block']}>
                    <ul className={classes['list']}>
                        {categoryListItem}
                    </ul>
                </div>
            </span>
        );
    });

    return (
        <div className={classes['category-box']}>
            <div className="col-md-4 offset-md-4 d-flex justify-content-around align-items-center">
                {categoryList}
            </div>
        </div>
    );
};

export default categoryList;
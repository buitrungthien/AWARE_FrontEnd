import React from 'react';
import * as CommonConstants from '../../../constants/index';
import arrow from '../../../assets/images/icons/arrow.svg';


const categoryList = (props) => {
    const categoryList = CommonConstants.CATEGORY_LIST.map(category => {
        return (
            <span key={category.name} style={{fontWeight: 500}}>
                {category.name}
                <img src={arrow} alt="" />
            </span>
        );
    });
    return (
        <div className="col-md-4 offset-md-4 d-flex justify-content-around align-items-center">
            {categoryList}
        </div>
    );
};

export default categoryList;
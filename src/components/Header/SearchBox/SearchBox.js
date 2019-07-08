import React from 'react';
import classes from './SearchBox.module.css';
import searchIcon from '../../../assets/images/icons/search.svg';

const searchBox = (props) => (
    <div className="col-3 d-flex justify-content-start align-items-center">
        <div className={classes['search-box']}>
            <input placeholder="Search"></input>
            <img style={{cursor: 'pointer'}} src={searchIcon} className="searchIcon" alt="search"></img>
        </div>
    </div>
);

export default searchBox;
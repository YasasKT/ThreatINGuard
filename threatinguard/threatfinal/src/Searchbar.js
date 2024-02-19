import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <input type='text'placeholder='Search..' className='input-search'/>
            <button type='submit' className='search-button'>
                <FontAwesomeIcon icon={faSearch} size='lg'/>
            </button>
            <div className='icon-container'>
                <button className='alert-button' type='submit'>
                    <FontAwesomeIcon icon={faBell} size='lg' />
                </button>
                <button className='user-button' type='submit'>
                    <FontAwesomeIcon icon={faUser} size='2x' />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
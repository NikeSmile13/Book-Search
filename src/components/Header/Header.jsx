import React from 'react';
import SearchFomr from '../SearchForm/SearchForm';
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-tilte text-capitalize'>search for books</h2>
                <SearchFomr/>
            </div>
        </header>
    </div>
  )
}

export default Header
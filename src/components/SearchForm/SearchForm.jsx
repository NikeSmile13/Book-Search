import React, {useRef, useEffect} from 'react';
import {FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';
import "./SearchForm.css";

const SearchForm = () => {
  const {setSearchTerm, setResultTitle, setCategories, setSortingBy} = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("ReactJS");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchText.current.value);
    } 

    navigate("/book");
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type = "text" className='form-control' placeholder='The Lost World ...' ref = {searchText} />
              <button type = "submit" className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-black' size = {32} />
              </button>
            </div>
            <div className='select-conteiner'>
              <label htmlFor="categories">
                Categories{' '}
                <select name="categories" id='categories' className='search-form-elem flex flex-sb bg-white'>
                  <option value="all">all</option>
                  <option value="art">art</option>
                  <option value="biography">biography</option>
                  <option value="computers">computers</option>
                  <option value="history">history</option>
                  <option value="medical">medical</option>
                  <option value="poetry">poetry</option>
                </select>
              </label>
              <label htmlFor="sortingBy">
                Sorting by{' '}
                <select name="sortingBy" id="sortingBy" className='search-form-elem flex flex-sb bg-white'>
                  <option value="relevance">relevance</option>
                  <option value="newest">newest</option>
                </select>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
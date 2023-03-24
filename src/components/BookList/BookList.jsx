import React from 'react'
import { useGlobalContext } from '../../context.'
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import "./BookList.css";

const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: (singleBook.id).replace("/works", ""),
      cover_img: singleBook.cover_id
    }
  });

  console.log(booksWithCovers);

  if(loading) return <Loading/>; 

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default BookList
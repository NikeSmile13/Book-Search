import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import "./BookDetalis.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://www.googleapis.com/books/v1/volumes/";
const API = "?key=AIzaSyCdCYgL1AWFlGyyfYShKFUfGTCPT8WemWQ";

const BookDetalis = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}${API}`);
        const data = await response.json();
        
        console.log(data);
        if(data) {
          const {volumeInfo} = data;
          const newBook = {
            cover_img: volumeInfo.imageLinks.smallThumbnail,
            title: volumeInfo.title,
            author: volumeInfo.authors ? volumeInfo.authors: "No subject auauthors found",
            description: volumeInfo.description,
            categories: volumeInfo.categories ? volumeInfo.categories : "No subject categories found"
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  console.log(book);

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-bnt' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22}/>
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
          <img src= {book?.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-detaiks-item categories'>
              <span>{book?.categories}</span>
            </div>
            <div className='book-detaiks-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-items author'>
              <span className='fw-6 fw-24'>{book?.author}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetalis
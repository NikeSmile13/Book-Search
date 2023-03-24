import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter, Routes, Route
}
from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './Home';
import BookList from './components/BookList/BookList';
import BooDetalis from './components/BookDetalis/BookDetalis';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AppProvider>
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home />}>
        <Route path = "book" element = {<BookList />} />
        <Route path = "/book/:id" element = {<BooDetalis />} />
      </Route>
    </Routes>
  </BrowserRouter>
</AppProvider>
);




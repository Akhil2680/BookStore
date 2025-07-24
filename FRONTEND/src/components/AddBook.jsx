import React from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const handlebook = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;
    const books = { title, author, date, image };
    await axios.post('https://bookstore-8f2m.onrender.com/books', books);
    alert('Book Added Successfully');
    e.target.reset();
  };

  return (
    <div className="add-book-container">
      <h1>Add Book</h1>
      <form className="add-book-form" onSubmit={handlebook}>
        <label>Title:</label>
        <input type="text" name="title" required />

        <label>Author:</label>
        <input type="text" name="author" required />

        <label>Date:</label>
        <input type="date" name="date" required />

        <label>Image URL:</label>
        <input type="text" name="image" required />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

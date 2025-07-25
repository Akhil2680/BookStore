import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './delete.css'; // Assuming you have some styles for this component
const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://bookstore-8f2m.onrender.com/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://bookstore-8f2m.onrender.com/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks(); // Refresh book list after deletion
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

 return (
  <div className="delete-container">
    <h2>Delete Books</h2>
    {books.length === 0 ? (
      <p>No books available</p>
    ) : (
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default DeleteBook;
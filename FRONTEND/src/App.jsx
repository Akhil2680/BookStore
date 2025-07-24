import React, { useState } from "react";
import "./App.css";
import AddBook from './components/AddBook';
import ViewBook from './components/ViewBook';
import SearchBook from './components/SearchBook';
import DeleteBook from './components/DeleteBook';

import { FaMoon, FaSun, FaPlus, FaBookOpen, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // can be: 'home', 'add', 'view', etc.

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="logo">
          <span role="img" aria-label="books">📚</span> <strong>Book Store</strong>
          <small>Your personal library manager</small>
        </div>
        <div className="nav-controls">
          <button onClick={toggleDarkMode} className="icon-btn">
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? "Light" : "Dark"} Mode</span>
          </button>
          <button className="icon-btn" onClick={() => setActiveTab('add')}><FaPlus /> <span>Add Book</span></button>
          <button className="icon-btn" onClick={() => setActiveTab('view')}><FaBookOpen /> <span>View Book</span></button>
          <button className="icon-btn" onClick={() => setActiveTab('search')}>
  <FaSearch /> <span>Search Book</span>
</button>

          <button className="icon-btn"><FaEdit /> <span>Update Book</span></button>
          <button className="icon-btn" onClick={() => setActiveTab('delete')}>
  <FaTrash /> <span>Delete Book</span>
</button>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-section">
        {activeTab === 'home' && (
          <>
            <h1>Welcome to the Book Store</h1>
            <p>Manage your collection effortlessly — Add, Search, Update or Delete books anytime!</p>
            <h2><span role="img" aria-label="pin">📌</span> Key Features</h2>
            <ul className="features-list">
              <li>🆕 Add new books with ease</li>
              <li>🔍 Search for books by title</li>
              <li>📝 Update book information</li>
              <li>🗑️ Remove outdated entries</li>
            </ul>
            <button className="cta-btn" onClick={() => setActiveTab('add')}>Get Started →</button>
          </>
        )}
        {activeTab === 'add' && <AddBook />}
        {activeTab === 'view' && <ViewBook />}
        {activeTab === 'search' && <SearchBook />}
        {activeTab === 'delete' && <DeleteBook />}


      </main>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Book Store. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

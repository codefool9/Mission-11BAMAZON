// AdminBooksPage — the main admin interface for managing books in the database.

import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { deleteBook } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/Book';

function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = () => {
    fetch(`${API_URL}/AllBooks?pageSize=1000&pageNum=1`)
      .then((r) => r.json())
      .then((data) => setBooks(data.books));
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (bookID: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch {
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <div className="text-center">
      <h1>Admin - Books</h1>

      {!showForm && !editingBook && (
        <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
          Add Book
        </button>
      )}

      {showForm && (
        <div className="text-start">
          <NewBookForm
            onSuccess={() => { setShowForm(false); fetchBooks(); }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingBook && (
        <div className="text-start">
          <EditBookForm
            book={editingBook}
            onSuccess={() => { setEditingBook(null); fetchBooks(); }}
            onCancel={() => setEditingBook(null)}
          />
        </div>
      )}

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingBook(b)}>Edit</button>
                <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(b.bookID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBooksPage;

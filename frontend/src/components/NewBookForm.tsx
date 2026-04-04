// NewBookForm — controlled form for adding a new book to the database.

import { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

const NewBookForm = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0, title: '', author: '', publisher: '', isbn: '',
    classification: '', category: '', pageCount: 0, price: 0,
  });

  // I convert pageCount and price to numbers since input values come back as strings
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'pageCount' || name === 'price' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      {(['title', 'author', 'publisher', 'isbn', 'classification', 'category'] as const).map((field) => (
        <label key={field} className="d-block mb-2 text-capitalize">
          {field}:
          <input type="text" className="form-control" name={field} value={formData[field]} onChange={handleChange} required />
        </label>
      ))}
      <label className="d-block mb-2">
        Page Count:
        <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} required />
      </label>
      <label className="d-block mb-2">
        Price:
        <input type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <button type="submit" className="btn btn-success me-2">Add Book</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewBookForm;

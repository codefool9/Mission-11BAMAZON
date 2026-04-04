// I centralize all API calls here so the components don't have to worry about
// constructing URLs or handling fetch options — they just call these functions.

import type { Book } from '../types/Book';

// I use VITE_API_URL so I can point to localhost in dev and the Azure URL in production
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/Book';

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/Add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  if (!response.ok) throw new Error('Failed to add book');
  return await response.json();
};

export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return await response.json();
};

export const deleteBook = async (bookID: number): Promise<void> => {
  const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
};

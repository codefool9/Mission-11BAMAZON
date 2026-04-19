import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Book } from './types/Book';
import { useCart } from './CartContext';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/Book';

function BookList() {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const returnState = location.state as { pageNum?: number; category?: string } | null;

  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(returnState?.pageNum ?? 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(returnState?.category ?? '');

  useEffect(() => {
    fetch(`${API_URL}/Categories`)
      .then(r => r.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    const sortParam = sortBy ? `&sortBy=${sortBy}` : '';
    const catParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
    fetch(`${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${sortParam}${catParam}`)
      .then(r => r.json())
      .then(data => {
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      });
  }, [pageSize, pageNum, sortBy, selectedCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Cart summary fixed top-right */}
      <div
        style={{
          position: 'fixed', top: '10px', right: '20px',
          background: '#f8f9fa', padding: '10px 15px', borderRadius: '8px',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)', fontSize: '16px', zIndex: 1000,
        }}
        onClick={() => navigate('/cart', { state: { pageNum, category: selectedCategory } })}
      >
        Cart ({cartCount}) <strong className="ms-2">${cartTotal.toFixed(2)}</strong>
      </div>

      {/* Welcome banner */}
      <div className="row bg-primary text-white p-3 mb-4 rounded">
        <h1 className="mb-0">BAMAZON Bookstore</h1>
      </div>

      <div className="row">
        {/* Category sidebar */}
        <div className="col-md-3">
          <h5>Categories</h5>
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => { setSelectedCategory(''); setPageNum(1); }}>
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`list-group-item list-group-item-action ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat); setPageNum(1); }}>
                {cat}
              </button>
            ))}
          </div>

          <button className="btn btn-outline-secondary btn-sm mt-3 w-100"
            onClick={() => setSortBy(sortBy === "title" ? null : "title")}>
            {sortBy === "title" ? "Clear Sort" : "Sort by Title"}
          </button>
        </div>

        {/* Book cards - centered content like WaterProject */}
        <div className="col-md-9">
          {books.map((b) => (
            <div className="card mb-3" key={b.bookID}>
              <div className="card-body text-center">
                <h3 className="card-title">{b.title}</h3>
                <ul className="list-unstyled">
                  <li><strong>Author:</strong> {b.author}</li>
                  <li><strong>Publisher:</strong> {b.publisher}</li>
                  <li><strong>ISBN:</strong> {b.isbn}</li>
                  <li><strong>Classification:</strong> {b.classification}</li>
                  <li><strong>Category:</strong> {b.category}</li>
                  <li><strong>Pages:</strong> {b.pageCount}</li>
                  <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                </ul>
                <button className="btn btn-success" onClick={() => addToCart(b.bookID, b.title, b.price)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="d-flex justify-content-center gap-2 mb-3">
            <button className="btn btn-primary btn-sm" disabled={pageNum === 1}
              onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1}
                className={`btn btn-sm ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPageNum(i + 1)}
                disabled={pageNum === i + 1}>
                {i + 1}
              </button>
            ))}

            <button className="btn btn-primary btn-sm" disabled={pageNum === totalPages}
              onClick={() => setPageNum(pageNum + 1)}>Next</button>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <label className="me-2">Results per page:</label>
            <select className="form-select form-select-sm w-auto" value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPageNum(1); }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookList;

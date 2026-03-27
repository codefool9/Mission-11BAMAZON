import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Book } from './types/Book';
import { useCart } from './CartContext';

function BookList() {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // I read location state so if the user comes back from the cart they land on the same page/category
  const returnState = location.state as { pageNum?: number; category?: string } | null;

  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(returnState?.pageNum ?? 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(returnState?.category ?? '');

  // I fetch categories once on mount — they don't change as the user pages through books
  useEffect(() => {
    fetch('http://localhost:4000/Book/Categories')
      .then(r => r.json())
      .then(setCategories);
  }, []);

  // I re-fetch books whenever the page, size, sort, or category filter changes
  useEffect(() => {
    const sortParam = sortBy ? `&sortBy=${sortBy}` : '';
    const catParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
    fetch(`http://localhost:4000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${sortParam}${catParam}`)
      .then(r => r.json())
      .then(data => {
        setBooks(data.books);
        // I calculate total pages here on the frontend using the total count from the API
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      });
  }, [pageSize, pageNum, sortBy, selectedCategory]);

  // I derive cart count and total from the cart array so they always stay in sync
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="row">

      {/* Category sidebar */}
      <div className="col-md-3">
        <h5>Categories</h5>
        <div className="list-group">
          {/* "All" resets the category filter back to showing every book */}
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
      </div>

      {/* Main content */}
      <div className="col-md-9">

        {/* Toolbar: sort toggle on the left, cart button on the right */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Clicking Sort again clears the sort so I toggle between "title" and null */}
          <button className="btn btn-success"
            onClick={() => setSortBy(sortBy === "title" ? null : "title")}>
            {sortBy === "title" ? "Clear Sort" : "Sort by Title"}
          </button>

          {/* I show the running cart total and item count right on the button */}
          <button
            className="btn btn-warning position-relative"
            onClick={() => navigate('/cart', { state: { pageNum, category: selectedCategory } })}>
            Cart — ${cartTotal.toFixed(2)}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Book cards */}
        {books.map((b) => (
          <div className="card mb-3" key={b.bookID}>
            <div className="card-body">
              <h5 className="card-title">{b.title}</h5>
              <ul className="list-unstyled">
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li>
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Classification:</strong> {b.classification}</li>
                <li><strong>Category:</strong> {b.category}</li>
                <li><strong>Pages:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
              </ul>
              <button className="btn btn-primary btn-sm"
                onClick={() => addToCart(b.bookID, b.title, b.price)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* Pagination — I generate one button per page using the totalPages count from the API */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button className="btn btn-primary" disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}>Previous</button>

          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1}
              className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setPageNum(i + 1)}
              disabled={pageNum === i + 1}>
              {i + 1}
            </button>
          ))}

          <button className="btn btn-primary" disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}>Next</button>
        </div>

        {/* Resetting pageNum to 1 when page size changes prevents landing on a page that no longer exists */}
        <div className="d-flex justify-content-center mb-3">
          <label className="me-2">Results per page:</label>
          <select className="form-select w-auto" value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPageNum(1); }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default BookList;

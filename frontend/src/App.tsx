import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { CartProvider } from './CartContext';
import BookList from './BookList';
import CartPage from './CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">BAMAZON</NavLink>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Store</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/adminbooks">Admin</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

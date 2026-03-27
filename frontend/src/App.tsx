import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import BookList from './BookList';
import CartPage from './CartPage';

// I wrap the whole app in CartProvider so any component in the tree
// can access the cart without passing props down manually.
function App() {
  return (
    <CartProvider>
      {/* BrowserRouter enables client-side navigation without full page reloads */}
      <BrowserRouter>
        <div className="container mt-4">
          <h1 className="text-center mb-4">BAMAZON Bookstore</h1>
          {/* I only have two routes: the main book list and the cart page */}
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

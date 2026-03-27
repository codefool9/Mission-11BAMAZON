import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

function CartPage() {
  // I pull the cart from context — no props needed since CartProvider wraps the whole app
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // I read the page number and category the user was on so I can send them back to the right spot
  const returnState = location.state as { pageNum?: number; category?: string } | null;

  // I calculate the order total by summing price × quantity for every item
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {/* If nothing is in the cart I show a friendly message instead of an empty table */}
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.bookID}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="fw-bold">
              <td colSpan={3}>Total</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}

      {/* I pass the return state back so the user lands on the same page and category they left */}
      <button
        className="btn btn-primary"
        onClick={() => navigate('/', { state: returnState })}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default CartPage;

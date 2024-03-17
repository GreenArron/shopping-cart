import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import CartCounter from "./components/CartCounter";

function App() {
  const [cart, setCart] = useState({});
  const cartCount = Object.values(cart).reduce(
    (perv, count) => perv + count,
    0,
  );

  return (
    <>
      <nav>
        <Link to="/" aria-label="Home Index">
          <span className="logo-large">Comfys</span>
        </Link>

        <div className="right-side">
          <Link to="products">Shop</Link>

          {cartCount > 0 ? (
            <Link
              to="products/checkout"
              aria-label={`Checkout ${cartCount} items`}
            >
              <CartCounter count={cartCount} />
            </Link>
          ) : (
            <Link to="#" aria-label="Checkout (empty cart)">
              <CartCounter count={cartCount} />
            </Link>
          )}
        </div>
      </nav>

      <Outlet context={[cart, setCart]} />
    </>
  );
}

export default App;

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
          <CartCounter count={cartCount} />
        </div>
      </nav>

      <Outlet context={[cart, setCart]} />
    </>
  );
}

export default App;

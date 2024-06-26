import "./Checkout.css";
import PropTypes from "prop-types";
import _ from "lodash";
import { useNavigate, useOutletContext } from "react-router-dom";

import { round } from "../utils/commons";
import LinkButton from "../components/LinkButton";
import SelectCount from "../components/SelectCount";
import Draggable from "../components/Draggable";
import { useRef } from "react";

function CheckoutItem({ title, image, price, cartCount, onCountChange }) {
  return (
    <article className="checkout-product">
      <img src={image} />
      <div className="product-info">
        <div className="product-name">{title}</div>
        <div className="price">$ {price}</div>
      </div>
      <div className="buy-controls">
        <SelectCount count={cartCount} setCount={onCountChange} />
      </div>
    </article>
  );
}

CheckoutItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  cartCount: PropTypes.number,
  onCountChange: PropTypes.func,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};

function Checkout() {
  const navigate = useNavigate();
  const cartAreaRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart, products] = useOutletContext();
  const boughtProducts = products
    .filter((product) => Object.keys(cart).includes(product.id.toString()))
    .map((product) => {
      return { ...product, cartCount: cart[product.id] };
    });
  const totalPrice = round(
    boughtProducts.reduce(
      (currTotal, product) => currTotal + product.price * product.cartCount,
      0,
    ),
    2,
  );

  function changeCart(func, productId) {
    const currentCount = cart[productId] === undefined ? 0 : cart[productId];
    const newCount = Math.max(func(currentCount), 0);
    const changed = newCount - currentCount;

    if (changed < 0 && newCount === 0) {
      setCart((currCart) => _.omit(currCart, productId));
    } else if (changed !== 0) {
      setCart((currCart) => {
        return { ...currCart, [productId]: newCount };
      });
    }
  }

  function confirmPurchase() {
    alert("You bought it! (imaginary redirect)");
  }

  function navigateToProducts(e) {
    if (cartAreaRef.current && !cartAreaRef.current.contains(e.target)) {
      navigate("/products");
    }
  }

  return (
    <div onClick={navigateToProducts} className="checkout-backdrop">
      <section className="checkout" ref={cartAreaRef}>
        <h1>Your Cart:</h1>

        <div className="checkout-main">
          <Draggable aria-label="Current Cart" rootClass="checkout-cart">
            {boughtProducts.map((product) => {
              return (
                <CheckoutItem
                  key={product.id}
                  {...product}
                  onCountChange={(func) => changeCart(func, product.id)}
                />
              );
            })}
          </Draggable>
          <div className="checkout-decide">
            <ul className="checkout-info">
              <li>
                <label htmlFor="checkout-total">Total: </label>
                <span id="checkout-total">{totalPrice}$</span>
              </li>
            </ul>
            <button className="checkout" onClick={confirmPurchase}>
              Purchase
            </button>
            <LinkButton className="continue" to="/products">
              Continue Shopping
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;

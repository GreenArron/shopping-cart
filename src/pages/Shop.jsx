import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Shop.css";
import { Filter, FilterItem } from "../components/Filter";
import { fetchProducts, fetchCategories } from "../utils/fakestore-api";
import StarRating from "../components/StarRating";
import SelectCount from "../components/SelectCount";
import { useOutletContext } from "react-router-dom";

function Product({ title, image, price, rating, inCartCount, onCountChange }) {
  return (
    <div className="shop-product">
      <img src={image} />
      <div className="product-info">
        <div className="product-name">{title}</div>
        <div className="rating">
          <StarRating rating={rating.rate} total={5} />
          <span className="rate-count">({rating.count})</span>
        </div>
        <div className="price">$ {price}</div>
      </div>
      <div className="buy-controls">
        <SelectCount count={inCartCount} setCount={onCountChange} />
      </div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  inCartCount: PropTypes.number,
  onCountChange: PropTypes.func,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};

function Shop() {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useOutletContext();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  function changeCart(func, productId) {
    const change = func(0);
    const currentCount = cart[productId] === undefined ? 0 : cart[productId];
    const newCount = Math.max(currentCount + change, 0);
    const changed = newCount - currentCount;

    if (changed !== 0) {
      setCart((currCart) => {
        return { ...currCart, [productId]: newCount };
      });
    }
  }

  useEffect(() => {
    fetchCategories().then((allCategories) => setCategories(allCategories));
  }, []);

  useEffect(() => {
    fetchProducts({ category: category }).then((newProducts) =>
      setProducts(newProducts),
    );
  }, [category]);

  return (
    <main className="shop">
      <section className="controls" aria-label="filter controls">
        <Filter name="Filter" />

        <Filter name="Sort By" />
      </section>
      <section className="products" aria-label="shop items">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              {...product}
              onCountChange={(func) => changeCart(func, product.id)}
              inCartCount={
                cart[product.id] === undefined ? 0 : cart[product.id]
              }
            />
          );
        })}
      </section>
    </main>
  );
}

Shop.propTypes = {
  cartCount: PropTypes.number,
  setCartCount: PropTypes.func,
};
export default Shop;

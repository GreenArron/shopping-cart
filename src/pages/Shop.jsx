import "./Shop.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../utils/fakestore-api";
import Filter from "../components/Filter";
import StarRating from "../components/StarRating";
import SelectCount from "../components/SelectCount";
import SwitchBool from "../components/SwitchBool";
import _ from "lodash";

const CHEVRON_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>
);
const CART_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z" />
  </svg>
);

function Product({ title, image, price, rating, inCartCount, onCountChange }) {
  return (
    <article className="shop-product">
      <img src={image} />
      <div className="product-info">
        <h3 className="product-name">{title}</h3>
        <div className="rating">
          <StarRating rating={rating.rate} total={5} />
          <span className="rate-count">({rating.count})</span>
        </div>
        <div className="price">$ {price}</div>
      </div>
      <div className="buy-controls">
        {inCartCount === 0 ? (
          <button className="cart-add" onClick={() => onCountChange(() => 1)}>
            {CART_SVG} <span aria-description="adds item to cart">Add</span>
          </button>
        ) : (
          <SelectCount count={inCartCount} setCount={onCountChange} />
        )}
      </div>
    </article>
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

// formula: true Bayesian estimate
// it incorporates both the count of ratings and the rating itself
const getProductPopularity = (product, overallAverageRating) =>
  (product.rating.rate * product.rating.count + overallAverageRating * 300) /
  (product.rating.count + 300);

function getSortedProducts(products, sort, descending = true) {
  const order = descending ? (a, b) => b - a : (a, b) => a - b;

  switch (sort && sort.toLowerCase()) {
    case "price":
      return products.sort((a, b) => order(a.price, b.price));
    case "popularity": {
      const allItemRatings = products.reduce(
        (perv, currItem) => perv + currItem.rating.rate,
        0,
      );
      const averageItemRating = allItemRatings / products.length;
      return products.sort((a, b) =>
        order(
          getProductPopularity(a, averageItemRating),
          getProductPopularity(b, averageItemRating),
        ),
      );
    }
    case "rating":
      return products.sort((a, b) => order(a.rating.rate, b.rating.rate));
    default:
      return products;
  }
}

function Shop() {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useOutletContext();
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortAscending, setSortAscending] = useState(false);

  const filteredProducts =
    category === "All" || category === undefined
      ? products
      : products.filter(
          (value) => value.category.toLowerCase() === category.toLowerCase(),
        );
  const sortedProducts = getSortedProducts(
    filteredProducts,
    sortBy,
    !sortAscending,
  );

  useEffect(() => {
    fetchCategories().then((allCategories) => setCategories(allCategories));
  }, []);

  useEffect(() => {
    fetchProducts({ category: category }).then((newProducts) =>
      setProducts(newProducts),
    );
  }, [category]);

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

  return (
    <main className="shop">
      <section className="controls" aria-label="filter controls">
        <Filter
          name="Category"
          options={["All", ...categories]}
          currentFilter={category}
          setFilter={setCategory}
        />
        <div className="sort-container">
          <SwitchBool
            bool={sortAscending}
            setBool={setSortAscending}
            className={`sortorder ${sortBy === null && "disabled"}`}
          >
            {CHEVRON_SVG}
          </SwitchBool>
          <Filter
            name="Sort By"
            options={["Rating", "Price", "Popularity"]}
            currentFilter={sortBy}
            setFilter={setSortBy}
          />
        </div>
      </section>
      <section className="products" aria-label="shop items">
        {sortedProducts.map((product) => {
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
      <Outlet context={[cart, setCart, products]} />
    </main>
  );
}

Shop.propTypes = {
  cartCount: PropTypes.number,
  setCartCount: PropTypes.func,
};
export default Shop;
// testing purposes
export { Product };

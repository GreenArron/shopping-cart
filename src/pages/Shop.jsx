import "./Shop.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../utils/fakestore-api";
import Filter from "../components/Filter";
import StarRating from "../components/StarRating";
import SelectCount from "../components/SelectCount";
import SwitchBool from "../components/SwitchBool";

const CHEVRON_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>
);

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
    const change = func(0);
    const currentCount = cart[productId] === undefined ? 0 : cart[productId];
    const newCount = Math.max(currentCount + change, 0);
    // need to calculate again incase change is negative and count is 0
    const changed = newCount - currentCount;

    if (changed !== 0) {
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
            className={"sortorder"}
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

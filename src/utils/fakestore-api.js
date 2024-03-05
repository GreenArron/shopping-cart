async function fetchProducts({ limit = 20, category = null }) {
  if (category === null) {
    return (
      await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
    ).json();
  } else {
    return (
      await fetch(
        `https://fakestoreapi.com/products/?categoryId=${category}&limit=${limit}`,
      )
    ).json();
  }
}

async function fetchCategories() {
  return (await fetch("https://fakestoreapi.com/products/categories")).json();
}

export { fetchProducts, fetchCategories };

import { useState } from "react";
import { it, expect } from "vitest";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import Checkout from "../Checkout";

const mockProducts = [
  {
    id: 1,
    title: "TestProduct",
    price: 451,
    description: "Perfect mock test product",
    category: "show-test",
    image: "",
    rating: {
      rate: 5,
      count: 10,
    },
  },
  {
    id: 2,
    title: "NestProduct",
    price: 100,
    description: "Second Product mocked",
    category: "show-test2",
    image: "",
    rating: {
      rate: 3,
      count: 2000,
    },
  },
];
function createMockApp(initialCart = {}) {
  function MockApp() {
    const [mockCart, setMockCart] = useState(initialCart);
    return (
      <div className="testing-mock">
        <Outlet context={[mockCart, setMockCart, mockProducts]} />
      </div>
    );
  }
  return <MockApp />;
}

async function renderCommon(cart = {}) {
  let renderedElement;

  await waitFor(() => {
    renderedElement = render(
      <MemoryRouter>
        <Routes location={"/products/checkout"}>
          <Route path="/" element={createMockApp(cart)}>
            <Route path="/products/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  return renderedElement;
}

// these test: existence of buttons, total calculation, cart item showing up :P
// rest is tested on component level
it("matches last approved render (cart: 1:3)", async () => {
  const cart = { 1: 3 };
  const { container } = await renderCommon(cart);
  expect(container).toMatchSnapshot();
});

it("matches last approved render (cart: 1:1 2:1)", async () => {
  const cart = { 1: 1, 2: 1 };
  const { container } = await renderCommon(cart);
  expect(container).toMatchSnapshot();
});

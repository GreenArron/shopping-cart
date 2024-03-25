import { it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Product } from "../Shop";

const mockProduct = {
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
};

async function renderCommon(productCallback = null, cartCount = 0) {
  let renderedElement;

  await waitFor(() => {
    renderedElement = render(
      <MemoryRouter>
        <Product
          {...mockProduct}
          inCartCount={cartCount}
          onCountChange={productCallback}
        />
      </MemoryRouter>,
    );
  });

  return renderedElement;
}

it("matches last approved render (cartCount: 0)", async () => {
  const { container } = await renderCommon();
  expect(container).toMatchSnapshot();
});

it("matches last approved render (cartCount: 1)", async () => {
  const { container } = await renderCommon(null, 1);
  expect(container).toMatchSnapshot();
});

it("configured to run callback on add click", async () => {
  const user = userEvent.setup();
  const productCallback = vi.fn();
  renderCommon(productCallback);
  const addButton = screen.getByRole("button", { name: /add/i });
  await user.click(addButton);
  expect(productCallback).toBeCalled();
});

// the rest of functionality is mostly tested on their individual components

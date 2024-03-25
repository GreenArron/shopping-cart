import { useState } from "react";
import { it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "../Shop";

function createMockApp(initialCart = {}) {
  function MockApp() {
    const [mockCart, setMockCart] = useState(initialCart);
    return (
      <div className="testing-mock">
        <Outlet context={[mockCart, setMockCart]} />
      </div>
    );
  }
  return <MockApp />;
}

async function renderCommon() {
  let renderedElement;

  await waitFor(() => {
    renderedElement = render(
      <MemoryRouter>
        <Routes location={"/products"}>
          <Route path="/" element={createMockApp()}>
            <Route path="/products" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  return renderedElement;
}

vi.mock("../../utils/fakestore-api", () => {
  const moddedModule = {
    fetchProducts: vi.fn(),
    fetchCategories: vi.fn(),
  };

  moddedModule.fetchCategories.mockResolvedValue([
    "show-test",
    "dontshow-test",
  ]);
  moddedModule.fetchProducts.mockResolvedValue([
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
  ]);
  return moddedModule;
});

it("matches last approved render", async () => {
  const { container } = await renderCommon();
  expect(container).toMatchSnapshot();
});

it("shows mocked test product", async () => {
  renderCommon();
  const product = await screen.findByRole("article");
  expect(product.textContent).toMatch(/TestProduct/i);
});

it("has sorter components", async () => {
  await renderCommon();
  expect(screen.getByRole("button", { name: /sort/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /category/i })).toBeDefined();
});

it("correctly sorts categories", async () => {
  const user = userEvent.setup();
  renderCommon();

  const categoryButton = screen.getByRole("button", { name: /category/i });
  await user.click(categoryButton);

  const dontShowCategoryButton = screen.getByRole("button", {
    name: /dontshow-test/i,
  });
  await user.click(dontShowCategoryButton);
  expect(screen.queryByRole("article")).toBeNull();

  await user.click(categoryButton);
  const showCategoryButton = screen.getByRole("button", {
    name: /\bshow-test/i,
  });
  await user.click(showCategoryButton);
  expect(screen.getByRole("article")).toBeDefined();
});

// I can test the sort order and sort by here but god I don't need to 😭
// THIS IS FINE!!!

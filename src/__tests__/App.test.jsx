import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

it("has the brand name in the nav", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("navigation").textContent).toMatch(/comfys/i);
});

it("has a usable Link to products", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
    "href",
    "/products",
  );
});

it("has a usable Link to index", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Home Index" })).toHaveAttribute(
    "href",
    "/",
  );
});

it("has some sort of checkout", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /Checkout/ })).toBeDefined();
});

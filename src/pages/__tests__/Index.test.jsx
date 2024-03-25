import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "../Index";

it("have a tagline including the brand name", () => {
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>,
  );
  expect(screen.getByLabelText("tagline").textContent).toMatch(/comfys/i);
});

it("have a Link to /products", () => {
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
    "href",
    "/products",
  );
});

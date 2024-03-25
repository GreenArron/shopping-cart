import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import CartCounter from "../CartCounter";

it("counts the number", () => {
  const counter = render(<CartCounter count={1} />);
  expect(counter.baseElement.textContent).toMatch("1");
});

it("does not count 0", () => {
  const counter = render(<CartCounter count={0} />);
  expect(counter.baseElement.textContent).not.toMatch("0");
});

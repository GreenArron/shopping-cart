import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import SelectCount from "../SelectCount";

it("shows the correct count", () => {
  const selectCount = render(<SelectCount count={1} setCount={vi.fn()} />);
  expect(selectCount.baseElement.textContent).toMatch("1");
  expect(selectCount.baseElement.textContent).not.toMatch(/[23456789]/);
});

it("increases to the correct number", async () => {
  const user = UserEvent.setup();
  const callback = vi.fn();
  render(<SelectCount count={1} setCount={callback} />);

  const decreaseButton = screen.getByRole("button", { name: "decrease" });
  await user.click(decreaseButton);
  expect(callback).toHaveBeenCalledOnce();
  const calledArg = callback.mock.calls[0][0];
  expect(calledArg(1)).toBe(0);
});

it("decreases to the correct number", async () => {
  const user = UserEvent.setup();
  const callback = vi.fn();
  render(<SelectCount count={1} setCount={callback} />);

  const addButton = screen.getByRole("button", { name: "increase" });
  await user.click(addButton);
  expect(callback).toHaveBeenCalledOnce();
  const calledArg = callback.mock.calls[0][0];
  expect(calledArg(1)).toBe(2);
});

import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Searchbar from "../Searchbar";

function renderCommon(onChange) {
  render(<Searchbar onChange={onChange} />);
}

it("has an inputfield", () => {
  renderCommon();
  expect(screen.getByRole("textbox", { name: /search bar/i })).toBeDefined();
});

it("presents what's written on the field", async () => {
  const user = UserEvent.setup();
  renderCommon();

  const searchBar = screen.getByRole("textbox");

  const text = "true I LOVE Caravan Palace and Metallica";
  await user.type(searchBar, text);

  expect(searchBar.value).toMatch(text);
});

it("calls callback with value", async () => {
  const user = UserEvent.setup();
  const callback = vi.fn();
  renderCommon(callback);

  const searchBar = screen.getByRole("textbox");

  const text = "true I LOVE Caravan Palace and Metallica";
  await user.type(searchBar, text);

  expect(callback).toBeCalledTimes(text.length);
});

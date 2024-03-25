import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Filter from "../Filter";

const mockedFilter = (fn) => (
  <Filter
    name="testfilter"
    defaultOption={"testdefault"}
    currentFilter={"testselected"}
    options={["testselected"]}
    setFilter={fn}
  />
);

it("matches the last approved snapshots", async () => {
  const user = UserEvent.setup();
  const { container } = render(mockedFilter());
  expect(container).toMatchSnapshot();
  await user.click(screen.getByRole("button"));
  expect(container).toMatchSnapshot();
});

it("sets filter on click", async () => {
  const user = UserEvent.setup();
  const callback = vi.fn();
  render(mockedFilter(callback));
  await user.click(screen.getByRole("button"));
  await user.click(screen.getByRole("button", { name: /testdefault/i }));
  expect(callback).toHaveBeenCalledOnce();
});

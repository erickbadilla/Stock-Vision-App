import { render } from "@testing-library/react";
import { NavBar } from "../navbar.component";
it("renders navbar component", () => {
  const { container } = render(<NavBar />);
  expect(container).toMatchSnapshot();
});

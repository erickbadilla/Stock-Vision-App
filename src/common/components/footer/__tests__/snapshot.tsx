import { render } from "@testing-library/react";
import { Footer } from "../footer.component";
it("renders footer component", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});

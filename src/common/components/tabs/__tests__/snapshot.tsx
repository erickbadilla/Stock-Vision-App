import { render } from "@testing-library/react";
import { TabPanel } from "../tab-panel.component";
it("renders tab panel component", () => {
  const { container } = render(<TabPanel index={0} value={0} />);
  expect(container).toMatchSnapshot();
});

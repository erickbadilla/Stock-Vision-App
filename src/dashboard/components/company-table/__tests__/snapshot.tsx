import { render } from "@testing-library/react";
import { CompanyTable } from "../company-table.component";

it("renders CompanyTable component", () => {
  const { container } = render(<CompanyTable data={[]} />);
  expect(container).toMatchSnapshot();
});

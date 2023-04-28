import { render } from "@testing-library/react";
import Dashboard from "@/pages/index";
import { ToasterProvider } from "@/common/contexts/toaster/provider/toaster.context";

it("renders homepage unchanged", () => {
  const { container } = render(
    <ToasterProvider>
      <Dashboard
        tableCompanies={[]}
        companiesCache={[]}
        tableCompaniesCache={[]}
      />
    </ToasterProvider>
  );
  expect(container).toMatchSnapshot();
});

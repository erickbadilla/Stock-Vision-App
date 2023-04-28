import { render } from "@testing-library/react";
import { Toaster } from "../toaster.component";
import { ToasterProvider } from "@/common/contexts/toaster/provider/toaster.context";
it("renders tab panel component", () => {
  const { container } = render(
    <ToasterProvider>
      <Toaster />
    </ToasterProvider>
  );
  expect(container).toMatchSnapshot();
});

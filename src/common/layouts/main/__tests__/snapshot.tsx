import { render } from "@testing-library/react";
import { MainLayout } from "../main.layout";

it("renders MainLayout component", () => {
  const { container } = render(
    <MainLayout>
      <div>Hi</div>
    </MainLayout>
  );
  expect(container).toMatchSnapshot();
});

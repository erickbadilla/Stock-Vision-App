import { render } from "@testing-library/react";
import { RealtimeStockPrice } from "../realtime-stock-price.component";
import { ToasterProvider } from "@/common/contexts/toaster/provider/toaster.context";

it("renders RealtimeStockPrice component", () => {
  const { container } = render(
    <ToasterProvider>
      <RealtimeStockPrice symbols={[]} />
    </ToasterProvider>
  );
  expect(container).toMatchSnapshot();
});

import { render } from "@testing-library/react";
import { ISearchFormOption, SearchForm } from "../search-form.component";
it("renders search form component", () => {
  const { container } = render(
    <SearchForm
      searchLabel={""}
      matchingFieldsLabel={""}
      addSelectedFieldsLabel={""}
      onSelectedFields={function (options: ISearchFormOption[]): void {}}
      fetcherProvider={async function (
        _: string
      ): Promise<ISearchFormOption[]> {
        return [];
      }}
    />
  );
  expect(container).toMatchSnapshot();
});

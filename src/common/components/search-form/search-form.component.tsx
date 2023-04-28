import { FunctionComponent, useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useDebouncedCallback } from "use-debounce";
import styles from "./search.module.css";

export interface ISearchFormOption {
  label: string;
  value: string;
}

interface ISearchFormProps {
  searchLabel: string;
  matchingFieldsLabel: string;
  addSelectedFieldsLabel: string;

  isNumericSearch?: boolean;

  onSelectedFields: (options: ISearchFormOption[]) => void;
  onSearchError?: () => void;

  fetcherProvider: (valueToSearch: string) => Promise<ISearchFormOption[]>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const SearchForm: FunctionComponent<ISearchFormProps> = ({
  fetcherProvider,

  searchLabel,
  matchingFieldsLabel,
  addSelectedFieldsLabel,
  isNumericSearch = false,

  onSelectedFields,
  onSearchError,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [options, setOptions] = useState<ISearchFormOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ISearchFormOption[]>(
    []
  );

  const searchAPIProviderDebounced = useDebouncedCallback(
    async (searchKey: string) => {
      try {
        if (!searchKey) {
          return setOptions([]);
        }

        const searchOptions = await fetcherProvider(searchKey);
        setOptions(searchOptions);
      } catch (error) {
        onSearchError?.();
      }
    },
    550
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddFieldsButton = () => {
    onSelectedFields(selectedOptions);
    setSearchQuery("");
    setSelectedOptions([]);
    setOptions([]);
  };

  const getOptionLabelAutoComplete = (option: ISearchFormOption) =>
    option.label;

  const isOptionEqualToValueAutoComplete = (
    option: ISearchFormOption,
    value: ISearchFormOption
  ) => {
    return option.label === value.label;
  };

  const handleSelectedOptionsChanged = (
    _: unknown,
    options: ISearchFormOption[]
  ) => {
    setSelectedOptions(options);
  };

  useEffect(() => {
    searchAPIProviderDebounced(searchQuery);
  }, [searchAPIProviderDebounced, searchQuery]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <FormControl fullWidth>
          <FormLabel>{searchLabel}</FormLabel>

          <TextField
            value={searchQuery}
            fullWidth
            onChange={handleSearchChange}
            type={isNumericSearch ? "number" : "text"}
          />
        </FormControl>
      </div>

      <div className={styles.matchingContainer}>
        <FormControl fullWidth>
          <FormLabel>{matchingFieldsLabel}</FormLabel>

          <Autocomplete
            value={selectedOptions}
            multiple
            options={options}
            disableCloseOnSelect
            getOptionLabel={getOptionLabelAutoComplete}
            isOptionEqualToValue={isOptionEqualToValueAutoComplete}
            onChange={handleSelectedOptionsChanged}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddFieldsButton}
        disabled={!selectedOptions.length}
      >
        {addSelectedFieldsLabel}
      </Button>
    </div>
  );
};

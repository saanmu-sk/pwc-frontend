import React, { useState, useCallback } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import debounce from "lodash/debounce";

interface CountryFiltersProps {
  onSearch: (value: string) => void;
  onRegionFilter: (value: string) => void;
}

const CountryFilters: React.FC<CountryFiltersProps> = ({
  onSearch,
  onRegionFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300), // Adjust debounce delay as needed
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        label="Search by name or capital"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" sx={{ minWidth: 120, ml: 2 }}>
        <InputLabel>Region</InputLabel>
        <Select
          defaultValue="All"
          onChange={(e) => onRegionFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountryFilters;

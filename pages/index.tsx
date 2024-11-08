import React, { useState } from "react";
import CountryList from "../components/CountryList";
import CountryFilters from "../components/CountryFilters";
import { Typography, Container } from "@mui/material";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleRegionFilter = (value: string) => setRegionFilter(value);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Countries of the World
      </Typography>
      <CountryFilters
        onSearch={handleSearch}
        onRegionFilter={handleRegionFilter}
      />
      <CountryList searchTerm={searchTerm} regionFilter={regionFilter} />
    </Container>
  );
};

export default HomePage;

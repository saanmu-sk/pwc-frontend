import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";
import { CircularProgress, Grid, Button, Box, Typography } from "@mui/material";

interface CountryListProps {
  searchTerm: string;
  regionFilter: string;
}

const CountryList: React.FC<CountryListProps> = ({
  searchTerm,
  regionFilter,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchCountries = async (type: String) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/countries/search",
        {
          params: {
            name: searchTerm || undefined,
            region: regionFilter !== "All" ? regionFilter : undefined,
            limit: 20,
            page: searchTerm || regionFilter !== "All" ? 1 : page,
          },
        }
      );
      setCountries((prev) => [...prev, ...response.data.data]);
      setTotal(response.data.total);
      if (searchTerm || regionFilter !== "All") {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    } catch (error) {
      setError("Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCountries([]);
    setPage(1);
    fetchCountries("initial");
  }, [searchTerm, regionFilter]);

  return (
    <Box mt={5}>
      {error && <Typography color="error">{error}</Typography>}
      {countries.length === 0 && !loading && !error && (
        <Typography color="textSecondary" align="center">
          No countries found
        </Typography>
      )}
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.code}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {!loading && countries.length < total && (
        <Button
          onClick={() => fetchCountries("load")}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default CountryList;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Country } from "../types/country";
import { Typography, Container, CircularProgress, Box } from "@mui/material";

const CountryDetail: React.FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      axios
        .get(`http://localhost:5000/countries/country/${code}`)
        .then((response) => setCountry(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [code]);

  if (loading) return <CircularProgress />;
  if (!country) return <Typography color="error">Country not found</Typography>;

  return (
    <Container>
      <Typography variant="h3">{country.name}</Typography>
      <Box mt={2}>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
      </Box>
      <Typography>Region: {country.region}</Typography>
      <Typography>Population: {country.population}</Typography>
      {/* <Typography>Languages: {country.languages?.join(", ")}</Typography> */}
    </Container>
  );
};

export default CountryDetail;

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Country } from "../types/country";
import { getCurrentTimeInTimezone } from "../utils/timeUtils";
import { useRouter } from "next/router";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const timezone = country?.timezones?.[0];
  const currentTime = timezone ? getCurrentTimeInTimezone(timezone) : "N/A";
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/${country.code}`)}
      style={{ cursor: "pointer" }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <img src={country.flag} alt={`Flag of ${country.name}`} width="50" />
          <Box ml={2}>
            <Typography variant="h5">{country.name}</Typography>
            <Typography variant="body2">Region: {country.region}</Typography>
            <Typography variant="body2">Current Time: {currentTime}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;

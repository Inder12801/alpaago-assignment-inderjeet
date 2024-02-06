import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  LinearProgress,
  InputAdornment,
  Input,
  IconButton,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import useFetch from "../../hooks/useFetch"; // Assuming your fetch hook is here
import {
  WiDaySunny,
  WiCloudy,
  WiShowers,
  WiThunderstorm,
} from "react-icons/wi";
import { BiSearch } from "react-icons/bi";

const Weather = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFetch = useFetch();
  const [cityName, setCityName] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);

  const animatedCard = useSpring({
    config: { mass: 1, tension: 170, friction: 26 },
    from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  });
  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      const data = await handleFetch(cityName);
      setWeatherData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getWeatherIcon = () => {
    const temperature = weatherData?.temp;
    const humidity = weatherData?.humidity;

    if (temperature > 30 && humidity < 50) {
      return <WiDaySunny size={60} />;
    } else if (temperature < 20 && humidity > 70) {
      return <WiShowers size={60} />;
    } else if (temperature >= 20 && temperature <= 30) {
      return <WiCloudy size={60} />;
    } else {
      return <WiThunderstorm size={60} />;
    }
  };
  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };
  const handleSearch = () => {
    fetchWeather();
  };
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" color="error">
        {error.message}
      </Typography>
    );
  }

  const weatherIcon = getWeatherIcon();

  return (
    <animated.div style={animatedCard}>
      <Card
        sx={{
          minWidth: 600,
          minHeight: 400,
          boxShadow: 2,
          backgroundColor: "#f4f4f4",
          m: "auto",
        }}
        className="weather-card"
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              color: "white",
            }}
          >
            <Input
              placeholder="Enter city"
              value={cityName}
              onChange={handleCityChange}
              onKeyDown={handleEnterKeyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    onKeyDown={handleEnterKeyPress}
                  >
                    <BiSearch color="white" />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              inputProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </Box>
          <Typography
            variant="h5"
            component="h2"
            color="#ffffff"
            textAlign={"center"}
            fontWeight={"700"}
            textTransform={"capitalize"}
          >
            {cityName},
          </Typography>
          <Typography variant="body2" color="#ffffff">
            {weatherData?.description}
          </Typography>
          <Typography
            variant="h5"
            color="#ffffff"
            textAlign={"center"}
            fontWeight={"500"}
            fontSize={["10px", "60px"]}
            mt={2}
          >
            {weatherData?.temp}°C
          </Typography>
          <Typography variant="body2" color="#ffffff" textAlign={"center"}>
            Feels like {weatherData?.feels_like}°C
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <Typography
              variant="body2"
              color="#ffffff"
              fontSize={["10px", "20px"]}
              textAlign={"center"}
            >
              Humidity{" "}
              <Typography fontSize={["10px", "30px"]} textAlign={"center"}>
                {weatherData?.humidity}%
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="#ffffff"
              fontSize={["10px", "20px"]}
              textAlign={"center"}
            >
              Wind Speed
              <Typography fontSize={["10px", "30px"]} textAlign={"center"}>
                {weatherData?.wind_speed} km/h
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {weatherIcon}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <Typography
              variant="body2"
              color="#ffffff"
              fontSize={["10px", "16px"]}
              textAlign={"center"}
            >
              Min Temperature
              <Typography fontSize={["10px", "20px"]} textAlign={"center"}>
                {weatherData?.min_temp}°C
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="#ffffff"
              fontSize={["10px", "16px"]}
              textAlign={"center"}
            >
              Max Temperature
              <Typography fontSize={["10px", "20px"]} textAlign={"center"}>
                {weatherData?.max_temp}°C
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default Weather;

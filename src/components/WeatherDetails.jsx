import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../WeatherSearchDetails.css";
import { Card, Col, Container, Row } from "react-bootstrap";

const WeatherDetails = () => {
  const { lat, lon } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const apiKey = "6d9914d7acec3581e18aa480656d0274";
    const fetchCurrentWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error("Errore durante la fetch dei dettagli meteo attuali:", error);
      }
    };

    const fetchForecast = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        console.error("Errore durante la fetch fetch delle previsioni meteo:", error);
      }
    };

    fetchCurrentWeather();
    fetchForecast();
  }, [lat, lon]);

  const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const getForecastForNextDays = () => {
    return forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);
  };

  return (
    <>
      <div className="d-flex flex-column bg-dark" style={{ height: "95vh" }}>
        <div className="weather-details flex-grow-1 bg-dark d-flex justify-content-center align-items-center">
          {currentWeather && (
            <div className="text-center text-white mb-5" style={{ marginTop: "-500px" }}>
              <h2 className="mb-4 display-1">
                {currentWeather.name.toUpperCase()}{" "}
                <img
                  src={getIconUrl(currentWeather.weather[0].icon)}
                  alt="Current weather"
                  style={{ width: "100px" }}
                />
              </h2>
              <p className="text-lead text-light">
                Clicca su una card per visualizzare i dettagli inerenti al giorno scelto
              </p>
            </div>
          )}
        </div>
        <Container className="bg-dark mt-n3 px-0 mt-auto meteo-container">
          <Row xs={1} md={2} lg={5} className="g-4">
            {forecast &&
              getForecastForNextDays().map((day, index) => (
                <Col key={index} className="p-0 hover-zoom">
                  <Card
                    className="forecast-card rounded-0 mt-3 mb-3 text-white border-0 bg-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <h3>
                      {currentWeather.name}
                      <Card.Img variant="top" src={getIconUrl(day.weather[0].icon)} />
                    </h3>
                    <Card.Body>
                      <Card.Title>{new Date(day.dt * 1000).toLocaleDateString()}</Card.Title>
                      <Card.Text>Temp: {(day.main.temp - 273.15).toFixed(0)}°C</Card.Text>
                      <Card.Text>Condizioni: {day.weather[0].description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default WeatherDetails;

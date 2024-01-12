import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../WeatherSearchDetails.css";
import { Card, Col, Container, Row } from "react-bootstrap";

const WeatherDetails = () => {
  const { lat, lon } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);

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

  const handleCardClick = (day) => {
    setSelectedCard(day);
    const selectedDate = new Date(day.dt * 1000).toDateString();
    const filteredData = forecast.list.filter((item) => new Date(item.dt * 1000).toDateString() === selectedDate);
    setDailyForecast(filteredData);
  };

  return (
    <>
      <div className="d-flex flex-column bg-dark" style={{ height: "95vh" }}>
        <div className="weather-details flex-grow-1 bg-dark d-flex justify-content-center align-items-center">
          {currentWeather && (
            <div className="text-center text-white mb-5" style={{ marginTop: "-100px" }}>
              <h2 className="mb-4 display-1">{currentWeather.name.toUpperCase()}</h2>

              {selectedCard ? (
                <div className="selected-card-details">
                  <h2 className="mb-5">
                    Dettagli per il {selectedCard && new Date(selectedCard.dt * 1000).toLocaleDateString()}
                  </h2>
                  <Container>
                    <Row>
                      {dailyForecast.map((hourlyData, index) => (
                        <Col key={index} className="mb-4" xs={12} md={6} lg={3}>
                          <Card className="h-100 bg-transparent border-0 custom-card">
                            <Card.Body>
                              <Card.Title>
                                Ore{" "}
                                {new Date(hourlyData.dt * 1000).toLocaleTimeString("it-IT", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                <img
                                  src={getIconUrl(hourlyData.weather[0].icon)}
                                  alt="Weather icon"
                                  style={{ width: "50px" }}
                                />
                              </Card.Title>
                              <Card.Text>Temp {(hourlyData.main.temp - 273.15).toFixed(0)}°C</Card.Text>
                              <Card.Text>Condizioni {hourlyData.weather[0].description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              ) : (
                <p className="text-lead text-light">
                  Clicca su una card per visualizzare i dettagli inerenti al giorno scelto
                </p>
              )}
            </div>
          )}
        </div>
        <Container className="bg-dark mt-n3 px-0 mt-auto meteo-container p-3">
          <Row xs={2} md={2} lg={5} className="g-4">
            {forecast &&
              getForecastForNextDays().map((day, index) => (
                <Col key={index} className="p-0 hover-zoom">
                  <Card
                    className={`forecast-card rounded-3 me-3 text-white border-1 border-dark bg-dark ${
                      selectedCard === day ? "selected" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCardClick(day)}
                  >
                    <h3 className="m-3">
                      {currentWeather.name}
                      <Card.Img variant="top" src={getIconUrl(day.weather[0].icon)} />
                    </h3>
                    <Card.Body>
                      <Card.Title>{new Date(day.dt * 1000).toLocaleDateString()}</Card.Title>
                      <Card.Text>Temp {(day.main.temp - 273.15).toFixed(0)}°C</Card.Text>
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

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
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=it`;
        const response = await fetch(url);
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error("Errore durante la fetch dei dettagli meteo attuali:", error);
      }
    };

    const fetchForecast = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=it`;
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
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getForecastForNextDays = () => {
    return forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  };

  const handleCardClick = (day) => {
    setSelectedCard(day);
    const selectedDate = new Date(day.dt * 1000).toDateString();
    const filteredData = forecast.list.filter((item) => new Date(item.dt * 1000).toDateString() === selectedDate);
    setDailyForecast(filteredData);
  };

  const weatherBackgrounds = {
    Clear: "https://papers.co/wallpaper/papers.co-sc20-sky-blue-sunny-day-la-35-3840x2160-4k-wallpaper.jpg",
    Rain: "https://cdn.wallpapersafari.com/80/79/6JmCqO.jpg",
    Clouds: "https://wallpaperswide.com/download/cloudy_sky_6-wallpaper-4096x3072.jpg",
    ClearNight: "https://wallpapercave.com/wp/wp9267865.jpg",
    // RainNight: ""
    // CloudsNight: ""
  };

  const currentHour = new Date().getHours();

  const isDaytime = currentHour >= 6 && currentHour < 18;

  let backgroundUrl = "";

  if (currentWeather && currentWeather.weather && currentWeather.weather.length > 0) {
    const currentCondition = currentWeather.weather[0].main;

    switch (currentCondition) {
      case "Clear":
        backgroundUrl = isDaytime ? weatherBackgrounds.Clear : weatherBackgrounds.ClearNight;
        break;
      case "Rain":
        backgroundUrl = isDaytime ? weatherBackgrounds.Rain : weatherBackgrounds.RainNight;
        break;
      case "Clouds":
        backgroundUrl = isDaytime ? weatherBackgrounds.Clouds : weatherBackgrounds.CloudsNight;
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /* funzioni per giorni settimana*/
  }

  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString("it-IT", { weekday: "short" });
    return day.charAt(0).toUpperCase() + day.slice(1, 3);
  };

  const formatDateWithWeekday = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const weekday = date.toLocaleDateString("it-IT", { weekday: "long" });
    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    const dayMonth = date.toLocaleDateString("it-IT", { day: "2-digit", month: "short" });

    return `${formattedWeekday} ${dayMonth}`;
  };

  return (
    <Container fluid className="bg-dark px-0">
      <div className="d-flex flex-column bg-dark" style={{ height: "100vh" }}>
        <div
          className="weather-details flex-grow-1 bg-dark d-flex justify-content-center align-items-center"
          style={{ background: `url(${backgroundUrl}) no-repeat center center` }}
        >
          {currentWeather && (
            <div className="text-center text-white mb-5">
              <h2 className="mb-4 display-1">{currentWeather.name.toUpperCase()}</h2>

              {selectedCard ? (
                <div className="selected-card-details">
                  <h2 className="mb-5">Previsioni per {selectedCard && formatDateWithWeekday(selectedCard.dt)}</h2>
                  <Container className="scrollable">
                    <Row>
                      {dailyForecast.map((hourlyData, index) => (
                        <Col key={index} className="mb-4" xs={12}>
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
                              <Card.Text>{(hourlyData.main.temp - 273.15).toFixed(0)}°C</Card.Text>
                              <Card.Text>{toTitleCase(hourlyData.weather[0].description)}</Card.Text>
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
        <Row xs={5} className="g-1 fixed-bottom">
          {forecast &&
            getForecastForNextDays().map((day, index) => (
              <Col key={index} className="p-0 hover-zoom">
                <Card
                  className={`forecast-card rounded-3 text-white border-0 bg-dark fs-1 display-4 ${
                    selectedCard === day ? "selected" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(day)}
                >
                  <h3 className="text-center mt-3 display-6">{getDayOfWeek(day.dt)}</h3>
                  <Card.Img variant="top" src={getIconUrl(day.weather[0].icon)} className="align-self-center" />
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="fs-6">
                      {new Date(day.dt * 1000).toLocaleDateString("it-IT", { day: "2-digit", month: "short" })}
                    </Card.Title>
                    <Card.Text>{(day.main.temp - 273.15).toFixed(0)}°C</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};

export default WeatherDetails;

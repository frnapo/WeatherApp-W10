import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../WeatherSearchDetails.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Clear from "../assets/Clear.jpg";
import ClearNight from "../assets/ClearNight.jpg";
import Clouds from "../assets/Clouds.jpg";
import CloudsNight from "../assets/CloudsNight.jpg";
import Rain from "../assets/Rain.jpg";
import RainNight from "../assets/RainNight.jpg";
import Fog from "../assets/Fog.jpeg";
import FogNight from "../assets/FogNight.jpeg";
import Snow from "../assets/Snow.jpg";
import SnowNight from "../assets/SnowNight.jpg";
import Thunderstorm from "../assets/Thunderstorm.jpg";
import ThunderstormNight from "../assets/ThunderstormNight.jpg";
import MyNav from "./MyNav";

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
    Clear: Clear,
    Rain: Rain,
    Clouds: Clouds,
    Fog: Fog,
    Snow: Snow,
    Mist: Fog, // da cambiare dopo
    Thunderstorm: Thunderstorm,
    // Smoke da fare piu avanti
    // Haze da fare piu avanti
    // Sand da fare piu avanti
    // Dust da fare piu avanti

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ClearNight: ClearNight,
    RainNight: RainNight,
    CloudsNight: CloudsNight,
    FogNight: FogNight,
    SnowNight: SnowNight,
    MistNight: FogNight, // da cambiare dopo
    ThunderstormNight: ThunderstormNight, // da cambiare dopo non si legge bene la scritta della citta'
    // SmokeNight: "da fare piu avanti"
    // HazeNight: "da fare piu avanti"
    // SandNight: "da fare piu avanti"
    // DustNight: "da fare piu avanti"
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
      case "Fog":
        backgroundUrl = isDaytime ? weatherBackgrounds.Fog : weatherBackgrounds.FogNight;
        break;
      case "Snow":
        backgroundUrl = isDaytime ? weatherBackgrounds.Snow : weatherBackgrounds.SnowNight;
        break;
      case "Mist":
        backgroundUrl = isDaytime ? weatherBackgrounds.Mist : weatherBackgrounds.MistNight;
        break;
      case "Thunderstorm":
        backgroundUrl = isDaytime ? weatherBackgrounds.Thunderstorm : weatherBackgrounds.ThunderstormNight;
        break;
      default:
        break;
    }
  }

  const handleDeselectCard = () => {
    setSelectedCard(null);
    setDailyForecast([]);
  };

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
      <MyNav />
      <div className="d-flex flex-column bg-dark" style={{ height: "100vh" }}>
        <div
          className="weather-details flex-grow-1 bg-dark d-flex justify-content-center align-items-center"
          style={{ background: `url(${backgroundUrl}) no-repeat center center / cover` }}
        >
          {currentWeather && (
            <div className="text-center text-white mb-5">
              <h2 className="mb-4 display-1">{currentWeather.name.toUpperCase()}</h2>

              {selectedCard ? (
                <div className="selected-card-details">
                  <h2 className="mb-4 display-5">
                    {selectedCard && formatDateWithWeekday(selectedCard.dt)}{" "}
                    <Button variant="outline-light" className="rounded-5 px-4 mb-1 ms-2" onClick={handleDeselectCard}>
                      X
                    </Button>
                  </h2>
                  <Container className="scrollable mt-5">
                    {dailyForecast.map((hourlyData, index) => (
                      <Card key={index} className="scrollable-card bg-transparent border-0 custom-card text-light">
                        <Card.Body>
                          <Card.Title className="display-2">
                            {new Date(hourlyData.dt * 1000).toLocaleTimeString("it-IT", {
                              hour: "2-digit",
                            })}
                            <img
                              src={getIconUrl(hourlyData.weather[0].icon)}
                              alt="Weather icon"
                              style={{ width: "100px" }}
                              className="m-0"
                            />
                          </Card.Title>
                          <Card.Text className="display-4 mb-0">
                            {(hourlyData.main.temp - 273.15).toFixed(0)}°C
                          </Card.Text>
                          <Card.Text>{toTitleCase(hourlyData.weather[0].description)}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Container>
                </div>
              ) : (
                <div>
                  <div className="current-weather-details mb-4">
                    <p className="display-1">{(currentWeather.main.temp - 273.15).toFixed(0)}°C</p>
                    <p className="display-6">
                      {toTitleCase(currentWeather.weather[0].description)}
                      <img
                        src={getIconUrl(currentWeather.weather[0].icon)}
                        alt="Weather icon"
                        style={{ width: "70px" }}
                        className="mb-1"
                      />
                    </p>
                    <p className="text-lead text-light">Umidità: {currentWeather.main.humidity}%</p>
                    <p className="text-lead text-light">Pressione: {currentWeather.main.pressure} hPa</p>
                    <p className="text-lead text-light">Vento: {(currentWeather.wind.speed * 3.6).toFixed(0)} km/h</p>
                  </div>
                  <p className="text-lead text-light mb-5 pb-5">Seleziona un giorno per controllare le previsioni</p>
                </div>
              )}
            </div>
          )}
        </div>
        <Row xs={5} className="g-1 fixed-bottom">
          {forecast &&
            getForecastForNextDays().map((day, index) => (
              <Col key={index} className="p-0 hover-zoom">
                <Card
                  className={`forecast-card text-white rounded-0 border-0  bg-transparent fs-1 display-4 ${
                    selectedCard === day ? "selected" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(day)}
                >
                  <h3 className="text-center display-6">{getDayOfWeek(day.dt)}</h3>
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

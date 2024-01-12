import React, { useState } from "react";
import { Container, FormControl, Button, Alert } from "react-bootstrap";
import "../WeatherSearchDetails.css";
import { Link } from "react-router-dom";

const WeatherSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: "" }), 3000);
  };

  const fetchLocationData = async (city) => {
    try {
      const apiKey = "61ca30200b28d41a9baa34dea0d5d96e";
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
      const data = await response.json();

      if (data.length === 0) {
        showAlert("Nessuna città trovata. Riprova con un nome diverso.");
        return;
      }

      setLocationData(data[0]);
    } catch (error) {
      console.error("Errore durante la fetch", error);
      showAlert("Si è verificato un errore durante la ricerca. Riprova più tardi.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      showAlert("Inserisci il nome di una città per la ricerca.");
      return;
    }
    fetchLocationData(searchTerm);
  };

  return (
    <div className="video-search-container bg-dark" style={{ height: "95vh" }}>
      <video autoPlay loop muted className="video-bg">
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Il tuo browser non supporta il tag video.
      </video>
      <Container className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <FormControl
            type="text"
            placeholder="Cerca meteo per città..."
            className="mr-sm-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit" className="ms-2">
            Cerca
          </Button>
        </form>
        {locationData && (
          <Link to={`/weather/${locationData.lat}/${locationData.lon}`}>
            Vedi dettagli meteo per {locationData.name}
          </Link>
        )}
        {alert.show && (
          <Alert variant="danger" className="search-alert">
            {alert.message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default WeatherSearch;

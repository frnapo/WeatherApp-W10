import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherSearch from "./components/WeatherSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <>
      {/* consiglio di testarlo il modalita' iphone12 o altri cellulari, funziona comunque bene ad altre risoluzioni */}
      {/* consiglio lo sfondo Rain in WeatherDetails, il mio preferito :) */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherSearch />} />
          <Route path="/weather/:lat/:lon" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

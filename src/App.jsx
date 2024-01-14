import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherSearch from "./components/WeatherSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <>
      {/* consiglio di testarlo il modalita' iphone14 o altri cellulari, funziona comunque bene a desktop ed altre risoluzioni forse qualche problemino da gestire con i portatili*/}
      {/* consiglio lo sfondo Rain in WeatherDetails, il mio preferito :) */}
      {/* ci son da finire alcune condizioni per gli sfondi e altre piccolezze, ma i principali sono gestiti */}
      {/* vorrei anche inserire delle icone personalizzate piu avanti, magari quando riprendo il progetto in typescript */}
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

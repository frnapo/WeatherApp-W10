import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import WeatherSearch from "./components/WeatherSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <>
      <MyNav />
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

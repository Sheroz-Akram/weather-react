import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WeatherPage from "./Components/WeatherPage";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App dark:bg-gray-800">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Search" element={<WeatherPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

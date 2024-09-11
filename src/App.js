import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import WeatherPage from "./Components/NavigationBar/WeatherPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />

        <Routes>
          <Route index path="/" element={<h1>Home</h1>} />
          <Route path="/Search" element={<WeatherPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

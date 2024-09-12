import React, { useEffect, useState } from "react";
import {
  FaWind,
  FaThermometerHalf,
  FaTint,
  FaCloud,
  FaSun,
  FaEye,
} from "react-icons/fa";
import { FaGauge, FaMoon } from "react-icons/fa6";

// Icons for day and night
const weatherIcons = {
  "clear sky": { day: "☀️", night: "🌙" },
  "few clouds": { day: "🌤️", night: "🌥️" },
  "scattered clouds": { day: "☁️", night: "☁️" },
  "broken clouds": { day: "🌥️", night: "🌥️" },
  "shower rain": { day: "🌧️", night: "🌧️" },
  rain: { day: "🌦️", night: "🌦️" },
  thunderstorm: { day: "⛈️", night: "⛈️" },
  snow: { day: "❄️", night: "❄️" },
  mist: { day: "🌫️", night: "🌫️" },
};

const WeatherCard = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "883f67bbdfd47a33a0512e9075b68955"; // Replace with your OpenWeather API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        findTime(data.timezone);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Get Local Time and Data from Time Zone of Area
  const findTime = (timezoneshift) => {
    const date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    var utc_date = new Date(now_utc);
    console.log(utc_date);
  };

  const { main, name, weather, wind, visibility, clouds, sys } = weatherData;

  const temperature = main.temp;
  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const pressure = main.pressure;
  const description = weather[0].description;
  const windSpeed = wind.speed;
  const cloudiness = clouds.all;
  const visibilityKm = visibility / 1000; // Convert visibility to kilometers
  const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isDay =
    localTime.getTime() >= sys.sunrise * 1000 &&
    localTime.getTime() < sys.sunset * 1000;
  const icon = weatherIcons[description]
    ? isDay
      ? weatherIcons[description].day
      : weatherIcons[description].night
    : "🌡️";

  return (
    <>
      <div className="w-full max-w-screen-sm bg-gray-200 dark:bg-gray-900 p-10 rounded-xl ring-2 ring-white ring-opacity-40">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold dark:text-white">
              {localTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" - "}
              {localTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <span className="text-6xl font-bold dark:text-white">
              {Math.round(temperature)}°C
            </span>
            <span className="font-semibold mt-1 text-gray-500 dark:text-gray-300">
              {name}
            </span>
            <span className="font-semibold text-gray-500 dark:text-gray-300">
              {description}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-6xl">{icon}</span>
          </div>
        </div>

        {/** Other Weather Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <FaThermometerHalf className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Feels like: {Math.round(feelsLike)}°C
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTint className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Humidity: {humidity}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaWind className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Wind: {windSpeed} m/s
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCloud className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Cloudiness: {cloudiness}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEye className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Visibility: {visibilityKm} km
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaGauge className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Pressure: {pressure} hPa
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSun className="text-xl text-yellow-500" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Sunrise: {sunriseTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMoon className="text-xl text-yellow-500" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Sunset: {sunsetTime}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <WeatherTime temp="29°C" time="11:00" period="AM" />
          <WeatherTime temp="31°C" time="1:00" period="PM" />
          <WeatherTime temp="32°C" time="3:00" period="PM" />
          <WeatherTime temp="31°C" time="5:00" period="PM" />
          <WeatherTime temp="27°C" time="7:00" period="PM" />
        </div>
      </div>

      <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-gray-200 p-10 mt-4 rounded-xl ring-2 ring-white ring-opacity-40 dark:bg-gray-900">
        <WeatherDay />
        <WeatherDay />
        <WeatherDay />
        <WeatherDay />
      </div>
    </>
  );
};

const WeatherTime = ({ temp, time, period }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-lg dark:text-white">{temp}</span>
      <svg
        className="h-10 w-10 fill-current text-gray-400 mt-3"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
      </svg>
      <span className="font-semibold mt-1 text-sm dark:text-white">{time}</span>
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-200">
        {period}
      </span>
    </div>
  );
};

const WeatherDay = () => {
  return (
    <div class="flex justify-between items-center">
      <span class="font-semibold text-lg w-1/4 dark:text-white">
        Fri, 22 Jan
      </span>
      <div class="flex items-center justify-end w-1/4 pr-10">
        <span class="font-semibold dark:text-white">12%</span>
        <svg
          class="w-6 h-6 fill-current ml-1 dark:text-white"
          viewBox="0 0 16 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="matrix(1,0,0,1,-4,-2)">
            <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
          </g>
        </svg>
      </div>
      <svg
        class="h-8 w-8 fill-current w-1/4 dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
      </svg>
      <span class="font-semibold text-lg w-1/4 text-right dark:text-white">
        18° / 32°
      </span>
    </div>
  );
};

export default WeatherCard;

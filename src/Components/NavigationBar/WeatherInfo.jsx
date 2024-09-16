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

// Mapping of timezones and their offsets (UTC+/- hours)
const timezoneOffsets = {
  "-12": "Baker Island Time (BIT)",
  "-11": "Niue Time (NUT), Samoa Standard Time (ST)",
  "-10": "Hawaii-Aleutian Standard Time (HST)",
  "-9": "Alaska Standard Time (AKST)",
  "-8": "Pacific Standard Time (PST)",
  "-7": "Mountain Standard Time (MST)",
  "-6": "Central Standard Time (CST)",
  "-5": "Eastern Standard Time (EST)",
  "-4": "Atlantic Standard Time (AST)",
  "-3": "Argentina Time (ART), Brasilia Time (BRT)",
  "-2": "South Georgia Time (SGT)",
  "-1": "Azores Time (AZOT)",
  0: "Greenwich Mean Time (GMT), Coordinated Universal Time (UTC)",
  1: "Central European Time (CET)",
  2: "Eastern European Time (EET), Kaliningrad Time (USZ1)",
  3: "Moscow Time (MSK), East Africa Time (EAT)",
  4: "Azerbaijan Time (AZT), Samara Time (SAMT)",
  5: "Pakistan Standard Time (PKT), Yekaterinburg Time (YEKT)",
  6: "Bangladesh Standard Time (BST), Omsk Time (OMST)",
  7: "Indochina Time (ICT), Krasnoyarsk Time (KRAT)",
  8: "China Standard Time (CST), Singapore Time (SGT)",
  9: "Japan Standard Time (JST), Korea Standard Time (KST)",
  10: "Australian Eastern Standard Time (AEST), Papua New Guinea Time (PGT)",
  11: "Solomon Islands Time (SBT), Vanuatu Time (VUT)",
  12: "New Zealand Standard Time (NZST), Fiji Time (FJT)",
};

// Function to get timezone name from seconds offset
function getTimezoneNameFromOffset(seconds) {
  // Convert seconds to hours
  const offsetHours = seconds / 3600;

  // Round to the nearest hour
  const roundedOffset = Math.round(offsetHours);

  // Get timezone name from the mapping
  return timezoneOffsets[roundedOffset] || "Unknown Timezone";
}

const WeatherCard = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [foreCastData, setForeCaseData] = useState(null);
  const [localTime, setLocalTime] = useState(new Date());
  const [timeZoneShift, setTimeZoneShift] = useState(0);
  const [sunrise, setSunRise] = useState(new Date());
  const [sunset, setSunSet] = useState(new Date());

  // Convert Unix Time Stamp to Date Object
  function convertUnixTimestampToDate(timestamp, timezoneShift) {
    const date = new Date(timestamp * 1000);
    const orignalShift = date.getTimezoneOffset() * 60;
    timestamp += orignalShift + timezoneShift;
    const shiftedDate = new Date(timestamp * 1000);
    return shiftedDate;
  }

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "883f67bbdfd47a33a0512e9075b68955"; // Replace with your OpenWeather API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=12`;

      try {
        const response = await fetch(url);
        const forCastResponse = await fetch(forecastURL);
        const data = await response.json();
        const forCastData = await forCastResponse.json();
        setWeatherData(data);
        setForeCaseData(forCastData);
        setTimeZoneShift(data.timezone);
        setLocalTime(convertUnixTimestampToDate(data.dt, data.timezone));
        setSunRise(convertUnixTimestampToDate(data.sys.sunrise, data.timezone));
        setSunSet(convertUnixTimestampToDate(data.sys.sunset, data.timezone));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (!weatherData) {
    return <div className="dark:text-white">Loading...</div>;
  }

  const { main, name } = weatherData;

  return (
    <>
      <div className="w-full max-w-screen-sm bg-gray-200 dark:bg-gray-900 p-5 sm:p-7 rounded-xl ring-2 ring-white ring-opacity-40">
        <div className="flex">
          <span className="text-xs sm:text-sm font-bold dark:text-white">
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
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <span className="text-6xl font-bold dark:text-white">
              {Math.round(main.temp)}°C
            </span>
            <span className="font-semibold mt-1 text-gray-500 dark:text-gray-300">
              {name}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <img
              className="h-30"
              src={`https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`}
              alt={weatherData["weather"][0]["description"]}
            />
          </div>
        </div>

        {/** Other Weather Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <FaThermometerHalf className="text-xl dark:text-white" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Feels like: {Math.round(main.feels_like)}°C
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTint className="text-xl dark:text-white" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Humidity: {weatherData.main.humidity}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaWind className="text-xl dark:text-white" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Wind: {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCloud className="text-xl dark:text-white" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Cloudiness: {weatherData.clouds.all}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEye className="text-xl dark:text-white" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Visibility: {weatherData.visibility / 1000} km
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaGauge className="text-xl dark:text-white" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Pressure: {weatherData.main.pressure} hPa
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSun className="text-xl text-yellow-500" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Sunrise:{" "}
              {sunrise.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMoon className="text-xl text-yellow-500" />
            <span className="text-[12px] sm:text-sm font-medium text-gray-500 dark:text-gray-300">
              Sunset:{" "}
              {sunset.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="flex mt-4">
          <span className="text-[12px] sm:text-sm text-gray-500 dark:text-gray-300">
            Time Zone:{" "}
            {getTimezoneNameFromOffset(timeZoneShift)}{" "}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {foreCastData.list.map((value, index) => {
            let time = convertUnixTimestampToDate(value.dt, timeZoneShift);
            return (
              <>
                <WeatherTime
                  temp={`${value.main.temp}°C`}
                  time={time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  period={time.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                  icon={value.weather[0].icon}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const WeatherTime = ({ temp, time, period, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-sm sm:text-lg dark:text-white">
        {temp}
      </span>
      <img
        className="h-14 w-14"
        alt={`weather ${temp}`}
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      />
      <span className="font-semibold mt-1 text-[10px] sm:text-base dark:text-white">
        {time}
      </span>
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-200">
        {period}
      </span>
    </div>
  );
};

export default WeatherCard;

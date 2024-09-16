import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WeatherCard from "./WeatherInfo";
import NavigationBar from "./NavigationBar";

export default function WeatherPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (!lat || !lon) {
      navigate("/");
    }
  }, [lat, lon, navigate]);

  return (
    <>
      <NavigationBar />
      <div className="dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto p-10 flex flex-col justify-around lg:flex-row gap-10">
          <div className="flex-1">
            <WeatherCard lat={lat} lon={lon} />
          </div>
          <div className="flex-1">
            <iframe
              src={`//maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`}
              className="w-full h-96 rounded-xl ring-2 ring-white ring-opacity-40"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

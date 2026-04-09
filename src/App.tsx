import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeatherByCity } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import CurrentSceleton from "./components/sceletons/CurrentSceleton";

const App = () => {
  const [coords, setCoords] = useState<Coords>({ lat: 20, lon: 50 });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("none");

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["city", location],
    queryFn: () => getWeatherByCity(location),
  });
  if (isLoading)
    return (
      <div className="p-10 text-white text-center">Loading weather...</div>
    );
  if (error)
    return <div className="p-10 text-red-500">Error loading weather data</div>;

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coordinates =
    location === "custom"
      ? coords
      : { lat: data?.latitude ?? 0, lon: data?.longitude ?? 0 };

  return (
    <div className="flex flex-col gap-8 shadow-md text-white">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Location: </h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Map Type:</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <Map coords={coordinates} onMapClick={onMapClick} mapType={mapType} />
      <Suspense fallback={<CurrentSceleton />}>
        <CurrentWeather coords={coordinates} />
      </Suspense>
      <Suspense fallback={<CurrentSceleton />}>
        <HourlyForecast coords={coordinates} />
      </Suspense>
      <Suspense fallback={<CurrentSceleton />}>
        <DailyForecast coords={coordinates} />
      </Suspense>
    </div>
  );
};

export default App;

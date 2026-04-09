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
import DailySceleton from "./components/sceletons/DailySceleton";
import HourlySceleton from "./components/sceletons/HourlySceleton";
import ThemeToggle from "./components/ThemeToggle";

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
    <div className="flex flex-col gap-8 w-full lg:w-9/12 mx-auto">
      <div className="flex gap-8 pt-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 ml-2 w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Map Type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Map coords={coordinates} onMapClick={onMapClick} mapType={mapType} />
        </div>
        <div className="col-span-1">
          <Suspense fallback={<CurrentSceleton />}>
            <CurrentWeather coords={coordinates} />
          </Suspense>
        </div>
        <div className="col-span-1">
          <Suspense fallback={<DailySceleton />}>
            <DailyForecast coords={coordinates} />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Suspense fallback={<HourlySceleton />}>
            <HourlyForecast coords={coordinates} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;

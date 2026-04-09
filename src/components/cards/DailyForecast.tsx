import React from "react";
import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

const DailyForecast = ({ coords }: Props) => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather(coords.lat, coords.lon),
  });
  if (isLoading)
    return (
      <div className="p-10 text-white text-center">Loading weather...</div>
    );
  if (error)
    return <div className="p-10 text-red-500">Error loading weather data</div>;
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.days.map((day) => (
        <div
          key={day.datetime}
          className="grid grid-cols-5 items-center text-center gap-2"
        >
          <p className="w-9 text-left">
            {new Date(day.datetime).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.icon} />
          <p>{Math.round(day.temp)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.tempmin)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.tempmax)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default DailyForecast;

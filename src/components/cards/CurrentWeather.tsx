import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

const CurrentWeather = ({ coords }: Props) => {
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
    <Card
      title="Current Weather"
      className="md:pb-17"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap2 items-center">
        <h2 className="text-6xl font-semibold">
          {Math.round(data.currentConditions.temp)}°C
        </h2>
        <WeatherIcon className="size-14" src={data.currentConditions.icon} />
        <h3 className="text-xl capitalize">
          {data.currentConditions.conditions}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date())}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap 2 items-center">
          <p className="text-gray-500">Feels Like</p>
          <p>{Math.round(data.currentConditions.feelslike)}°C</p>
        </div>
        <div className="flex flex-col gap 2 items-center">
          <p className="text-gray-500">Humidity</p>
          <p>{data.currentConditions.humidity}%</p>
        </div>
        <div className="flex flex-col gap 2 items-center">
          <p className="text-gray-500">Wind</p>
          <p>{data.currentConditions.windspeed}kmh</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;

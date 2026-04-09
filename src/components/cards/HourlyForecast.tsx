import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

const HourlyForecast = ({ coords }: Props) => {
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
      childrenClassName="flex gap-6 overflow-x-scroll"
      title="Hourly Forecast"
    >
      {data.days[0].hours?.map((hour) => (
        <div
          className="flex flex-col gap-2 items-center p-2"
          key={hour.datetime}
        >
          <p className="whitespace-nowrap">
            {new Date(`2000-01-01T${hour.datetime}`).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              },
            )}
          </p>
          <WeatherIcon src={hour.icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default HourlyForecast;

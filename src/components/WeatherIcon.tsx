import clsx from "clsx";
import React from "react";

type Props = {
  src: string;
  className?: string;
};

const WeatherIcon = ({ src, className }: Props) => {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/${src}.png`}
      alt="weather icon"
    />
  );
};

export default WeatherIcon;

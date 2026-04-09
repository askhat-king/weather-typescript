import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/next7days?unitGroup=metric&key=${API_KEY}`,
  );
  const data = await res.json();
  return weatherSchema.parse(data);
}

export async function getWeatherByCity(location: string) {
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=${API_KEY}`,
  );
  const data = await res.json();
  return weatherSchema.parse(data);
}

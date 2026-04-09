import { z } from "zod";

const WeatherPointSchema = z.object({
  datetime: z.string(),
  temp: z.number(),
  humidity: z.number().optional(), // Adding a few extra fields often found here
  conditions: z.string(),
  icon: z.string(),
  feelslike: z.number(),
  windspeed: z.number(),
});

const DaySchema = z.object({
  datetime: z.string(),
  tempmax: z.number(),
  tempmin: z.number(),
  temp: z.number(),
  conditions: z.string(),
  icon: z.string(),
  description: z.string().optional(),
  hours: z.array(WeatherPointSchema).optional(), // Keep this for the "Next Hours" section
});

export const weatherSchema = z.object({
  queryCost: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  resolvedAddress: z.string(),
  timezone: z.string(),
  currentConditions: WeatherPointSchema,
  days: z.array(DaySchema),
});

// Extract the type to use in your useState
export type WeatherData = z.infer<typeof weatherSchema>;

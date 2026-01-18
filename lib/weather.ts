"use client";

import { useState } from "react";

type Location = {
  id?: number;
  name: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  country?: string;
  timezone?: string;
};

const [forecast, setForecast] = useState<any | null>(null);
const [dailyWeather, setdailyWeather] = useState<any | null>(null);
const [error, setError] = useState("");

async function fetchForecast(location: Location) {
  // Clears old data
  setForecast(null);
  try {
    const forecastParams = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      timezone: "auto",
    });
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${forecastParams.toString()}`
    );

    if (!res.ok) throw new Error("Forecast failed");

    const data = await res.json();
    setForecast(data);
  } catch (err) {
    console.error("Weather fetch error:", err);
    setError(
      err instanceof Error ? err.message : "Failed to fetch weather data"
    );
  }
}

async function fetchDailyWeather(location: Location) {
  try {
    const dailyWeatherParams = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      daily: "uv_index_max",
    });
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${dailyWeatherParams.toString()}`
    );
    if (!res.ok) throw new Error("Daily Weather failed");
    const data = await res.json();
    setdailyWeather(data);
  } catch (err) {
    console.error("Weather fetch error:", err);
    setError(
      err instanceof Error ? err.message : "Failed to fetch weather data"
    );
  }
}

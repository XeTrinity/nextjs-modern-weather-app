"use client";

import { useState } from "react";
import CurrentWeather from "./widgets/current-weather";
import LocationSearch from "./widgets/location-search";
import UvIndex from "./widgets/uv-index";

type Location = {
  id?: number;
  name: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  country?: string;
  timezone?: string;
};

export default function WeatherDashboard() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [forecast, setForecast] = useState<any | null>(null);
  const [error, setError] = useState("");

  async function handleLocationSubmit(query: string) {
    if (query.trim().length < 2) {
      setError("City name must be at least 2 characters");
      return;
    }

    try {
      const params = new URLSearchParams({
        name: query.trim(),
        count: "8",
        language: "en",
        format: "json",
      });
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Location search failed status: ${response.status}`);
      }

      const data = (await response.json()) as { results?: Location[] };
      const results = data.results ?? [];

      if (results.length === 0) {
        setError("No results found.");
        return;
      }
      const chosenResult = results[0];

      const selectedLocationResult = {
        id: chosenResult.id,
        name: chosenResult.name,
        admin1: chosenResult.admin1,
        country: chosenResult.country,
        latitude: chosenResult.latitude,
        longitude: chosenResult.longitude,
        timezone: chosenResult.timezone,
      };
      setSelectedLocation(selectedLocationResult);
      await fetchForecast(selectedLocationResult);
    } catch (err) {
      console.log(err);
    }
  }

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
  return (
    <div>
      <div className="m-4 flex justify-center">
        <LocationSearch onSearch={handleLocationSubmit} />
      </div>
      <div className="flex  flex-col">
        <CurrentWeather location={selectedLocation} forecast={forecast} />
        <UvIndex/>
      </div>
    </div>
  );
}

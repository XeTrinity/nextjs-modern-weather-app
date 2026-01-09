"use client";

import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

type GeoResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
};
//add usestate error <p> or something
export default function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  function handleOnFocus() {
    setIsOpen(true);
  }
  function handleOnBlur() {
    setIsOpen(false);
  }

  async function handleSearch() {
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

      const data = (await response.json()) as { results?: GeoResult[] };
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        handleSearch();
    }
  };
  return (
    <div>
      <Command className="rounded-lg border  min-w-112.5">
        <CommandInput
          placeholder="Search for a City..."
          value={query}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onValueChange={(val) => {
            setQuery(val);
          }}
          onKeyDown={handleKeyDown}
        />
        <CommandList className={isOpen ? "block" : "hidden"}>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </div>
  );
}

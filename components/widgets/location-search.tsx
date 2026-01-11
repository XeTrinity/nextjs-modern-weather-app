"use client";

import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

type LocationSearchProps = {
  onSearch: (query: string) => void | Promise<void>;
};

export default function LocationSearch({ onSearch }: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleOnFocus() {
    setIsOpen(true);
  }
  function handleOnBlur() {
    setIsOpen(false);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(query);
      event.preventDefault();
      event.stopPropagation();
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

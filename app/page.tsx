import React, { useState } from "react";
import CitiesCard from "./_components/cities-card";
import CommandSearch from "./_components/command-search";

export default function Home() {
  const [selectedLocation, setSelctedLocation] = useState(null);
  
  return (
    <div>
      <div className="m-4 flex justify-center">
        <CommandSearch />
      </div>
      <div className="flex "><CitiesCard /></div>
    </div>
  );
}

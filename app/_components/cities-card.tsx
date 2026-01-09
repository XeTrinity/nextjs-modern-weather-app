import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default async function CitiesCard() {
  //const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m,apparent_temperature&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
  //const response = await data.json();

  return (
    <div>
      <Card className="min-w-122.5">
        <CardContent>
          <CardHeader>
            <h1 className="text-lg font-bold">City Location</h1>
          </CardHeader>
          {/* Main Grid */}
          <div className="grid grid-cols-3 grid-rows-[auto_1fr_auto]">
            {/* Top-Left: date/time*/}
            <div className="col-span-2">
              <p className="text-3xl font-semibold">Sunday</p>
              <p className="text-sm">{response.current.time}</p>
            </div>
            {/*Center column: Current weather icon + temp */}
            <div className="col-start-2 row-start-2 flex flex-col items-center justify-center">
              <Image
                src="/day_clear.svg"
                width={92}
                height={92}
                alt="day_clear"
              />
              <p className="text-3xl font-semibold pt-2">{response.current.temperature_2m}°F</p>
            </div>
            {/*Bottom-right: Current weather status/feeling*/}
            <div className="col-start-3 row-start-3 justify-self-end self-end -mt-3">
              <p>Clear Skys</p>
              <p>Feels like {response.current.apparent_temperature}°F</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

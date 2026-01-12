import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  location: any; // tighten later
  forecast: any; // tighten later
};

export default function CurrentWeather({ location, forecast }: Props) {
  if (!forecast) {
    return <p>Loading weather...</p>;
  }
  if (!forecast.current) {
    return <p>Weather data missing.</p>;
  }
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
              <p className="text-sm">TIME HERE</p>
            </div>
            {/*Center column: Current weather icon + temp */}
            <div className="col-start-2 row-start-2 flex flex-col items-center justify-center">
              <Image
                src="/day_clear.svg"
                width={92}
                height={92}
                alt="day_clear"
              />
              <p className="text-3xl font-semibold pt-2">
                {forecast.current.temperature_2m}°F
              </p>
            </div>
            {/*Bottom-right: Current weather status/feeling*/}
            <div className="col-start-3 row-start-3 justify-self-end self-end -mt-3">
              <p>Clear Skys</p>
              <p>Feels like {forecast.current.apparent_temperature}°F</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

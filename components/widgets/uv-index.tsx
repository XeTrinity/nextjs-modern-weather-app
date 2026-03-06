import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  location: any; // tighten later
  dailyWeather: any; // tighten later
};

export default function UvIndex({location, dailyWeather}: Props) {
    if (!dailyWeather) {
    return <p>Loading weather...</p>;
  }
  if (!dailyWeather.daily) {
    return <p>Weather data missing.</p>;
  }
  return (
    <div >
      <Card className="w-60">
        <CardHeader>
          <CardTitle>UV Index</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Progress value={dailyWeather.daily.uv_index_max[0]} variant="uv" indicatorVariant="circle" />
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

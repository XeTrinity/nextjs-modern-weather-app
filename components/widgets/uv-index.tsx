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
  dailyWeather: any; // tighten later
};

export default function UvIndex({dailyWeather}: Props) {
    if (!dailyWeather) {
    return <p>Loading weather...</p>;
  }
  if (!dailyWeather.dailyWeather) {
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
            <Progress value={dailyWeather.daily.uv_index_max} variant="uv" indicatorVariant="circle" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

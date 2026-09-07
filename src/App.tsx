import { AppRouter } from "@/routes/AppRouter";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MobileSplashScreen } from "@/components/ui/MobileSplashScreen";

export default function App() {
  return (
    <>
      <MobileSplashScreen />
      <AppRouter />
      <SpeedInsights />
    </>
  );
}
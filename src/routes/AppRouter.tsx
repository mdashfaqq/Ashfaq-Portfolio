import { useState, useEffect } from "react";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { ResumePage } from "@/pages/ResumePage";
import { CinematicTransition } from "@/components/navigation/CinematicTransition";

export const navigateToRoute = (path: string) => {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new Event("popstate"));
};

export function AppRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const isResume =
    currentPath === "/resume" ||
    currentPath === "/resume/" ||
    window.location.hash === "#/resume" ||
    window.location.hash === "#resume";

  return (
    <>
      <CinematicTransition />
      {isResume ? <ResumePage /> : <PortfolioPage />}
    </>
  );
}

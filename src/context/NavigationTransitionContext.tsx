import React, { createContext, useContext } from "react";
import { navigateToSection } from "@/components/navigation/CinematicTransition";

interface NavigationTransitionContextType {
  navigateToSection: (target: string, label?: string) => void;
}

const NavigationTransitionContext = createContext<NavigationTransitionContextType>({
  navigateToSection,
});

export const useNavigationTransition = () => useContext(NavigationTransitionContext);

export const NavigationTransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NavigationTransitionContext.Provider value={{ navigateToSection }}>
      {children}
    </NavigationTransitionContext.Provider>
  );
};

export { navigateToSection };

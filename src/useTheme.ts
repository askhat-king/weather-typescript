import { useContext } from "react";
import { ThemeContext } from "./components/ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("use theme must be used within a provider");
  return context;
};

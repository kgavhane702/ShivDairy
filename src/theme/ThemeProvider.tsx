import { createContext, ReactNode, useContext, useState } from "react";
import { colors, ThemeColors } from "./colors";

type Theme = {
  colors: ThemeColors;
};

const light: Theme = {
  colors,
};

const dark: Theme = {
  colors: {
    ...colors,
    background: "#000000",
    text: "#ffffff",
    card: "#111111",
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: light, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(light);

  const toggle = () => setTheme((t) => (t === light ? dark : light));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export type { Theme };


import { useEffect } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isValidTheme = ["emelephant", "emelephant-dark"].includes(savedTheme || "");
    const initialTheme = isValidTheme ? (savedTheme as "emelephant" | "emelephant-dark") : "emelephant";
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  return <>{children}</>;
};

export default ThemeWrapper;

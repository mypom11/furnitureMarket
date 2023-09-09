import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../Icons";

const DarkModeBtn = ({ className }: defaultProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeThemeHandler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <button onClick={changeThemeHandler} className={className}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default DarkModeBtn;

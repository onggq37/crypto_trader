import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const ThemeChangerButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button className={`ThemeChangerButton ${theme}`} onClick={handleClick}>
      <BsMoonStarsFill /> | <BsSun />
    </button>
  );
};

export default ThemeChangerButton;

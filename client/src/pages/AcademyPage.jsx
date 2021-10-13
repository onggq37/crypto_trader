import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const AcademyPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Login ${theme}`}>
      <h1>Welcome to CryptoTrader Academy</h1>
    </div>
  );
};

export default AcademyPage;

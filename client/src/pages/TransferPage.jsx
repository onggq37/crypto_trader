import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const AcademyPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Login ${theme}`}>
      <h1>Transfer History</h1>
      <img
        id="logo"
        src="images/under-construction.png"
        alt="logo"
        height="300px"
      />
    </div>
  );
};

export default AcademyPage;

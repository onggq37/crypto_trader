import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { FcGraduationCap } from "react-icons/fc";

const AcademyPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Login ${theme}`}>
      <h1>
        CryptoTrader Academy <FcGraduationCap />
      </h1>
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

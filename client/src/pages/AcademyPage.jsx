import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { FcGraduationCap } from "react-icons/fc";
import Posts from "../components/postsContainer/PostsContainer";
import Write from "../components/writePost/WritePost";

const AcademyPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`academy ${theme}`}>
      <h1>
        CryptoTrader Academy <FcGraduationCap />
      </h1>
      <Write />
      <Posts />
    </div>
  );
};

export default AcademyPage;

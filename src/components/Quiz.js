import React from "react";
import { Link } from "react-router-dom";

import SectionQuizHero from "./sections/SectionQuizHero";
import SectionQuizBox from "./sections/SectionQuizBox";

const Quiz = () => {
    return ( 
        <div className="quiz-view">
            <SectionQuizHero /> 
            <SectionQuizBox />
        </div>
     );
}
 
export default Quiz;
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import server from "../utils";
import DisplayLevels from "./sections/DisplayLevels";

const DifficultySelector = () => {
    
    const history = useHistory()

    const getLeveldetails = (e) => {
        console.log(e.target.id)
        window.localStorage.setItem("oldlevels", JSON.stringify([e.target.id]))

        history.push('/home')
    }


    return ( 
        <div className="display-difficulty-selector">
            <div className="paragraph">
                <h2>Select your level of difficulty</h2>
            </div>
            <div className="difficulty-selector">
                <DisplayLevels getLeveldetails={getLeveldetails} />
            </div>
        </div>
     );
}
 
export default DifficultySelector;
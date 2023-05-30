import React from "react";
import DifficultySelector from "../components/DifficultySelector";
import IndexHeader from "../components/IndexHeader";

const DifficultyView = () => {
    return ( 
        <div>
            <IndexHeader />
            <DifficultySelector />
        </div> 
    );
}
 
export default DifficultyView;
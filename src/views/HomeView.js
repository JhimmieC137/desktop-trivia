import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


import LandingPage from "../components/LandingPage";

const HomeView = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => history.push('/auth'), 3000)
    }, [])

    return ( 
        <div className="display-home-view">
            <LandingPage />
        </div>
     );
}
 
export default HomeView;
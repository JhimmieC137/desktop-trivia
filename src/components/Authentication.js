import React from "react";
import { useState } from "react";
import SectionSignUp from "./sections/SectionSignUp";
import SectionLogin from "./sections/SectionLogin";


const Authentication = () => {
    
    const [isRegistered, setIsRegistered] = useState(!null)


    return ( 
        <div>
            {isRegistered ?
                <div className="authentication">
                    <SectionLogin />
                    <div className="foot-note">
                        <p onClick={() => setIsRegistered(false)}>Create an account</p>
                    </div>
                </div> : 
                <div className="authentication">
                    <SectionSignUp />
                    <div className="foot-note">
                        <p onClick={() => setIsRegistered(true)}>Already have an account?</p>
                    </div>
                </div>
            }
        </div>
    );
}
    
export default Authentication;
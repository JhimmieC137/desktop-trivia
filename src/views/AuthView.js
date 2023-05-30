import React from "react";

import Authentication from "../components/Authentication";
import IndexHeader from "../components/IndexHeader";

const AuthView = () => {
    return ( 
        <div>
            <IndexHeader />
            <Authentication />
        </div>
     );
}
 
export default AuthView;
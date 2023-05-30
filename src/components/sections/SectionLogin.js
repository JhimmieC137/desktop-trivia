import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Redirect, useHistory } from "react-router-dom";

import server from "../../utils"


const SectionLogin = () => {
    const history = useHistory()
    const [feedback, setFeedback] = useState(null)

    const authLogin = (e) => {
        e.preventDefault()
        var token
        const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
        if (!tokenData) {
            token = ""
        }else{
            token = `Bearer ` + tokenData.refresh
        }
        
        axios.post(`${server.absolute_url}/sign-in`, {
            username: e.target[0].value,
            password: e.target[1].value
        },
            {headers : {
                'Content-Type': 'application/json',
                'Authorization': token
        }
        }).then((res) => {
            console.log(res.data.user.tokens)
            window.localStorage.setItem("tokens", JSON.stringify(res.data.user.tokens))
            setFeedback(null)
            history.push('/home')
        }).catch(err => {
            console.log(err)
            setFeedback(err.response.data)
        })
    }

    useEffect(() => {
        if (!feedback) setFeedback(null);
    }, [authLogin])

    return ( 
        <div className="section-login">
            {feedback && <p className="alert">{feedback}</p>}
            <br/>
            <form action="" onSubmit={authLogin} id="login" className="login">
                <div>
                    <label htmlFor="uname">Username:</label>
                    <input id="uname" type="text" name="username"/>
                </div>
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input id="pwd" type="password" name="password"/>
                </div>
                <div className="submit">
                    <button value="Submit" type="submit" form="login">Login</button>
                </div>
            </form>
        </div>
    );
}
 
export default SectionLogin;
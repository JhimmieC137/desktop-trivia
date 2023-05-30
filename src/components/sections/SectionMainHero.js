import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import server from "../../utils";
import DisplayLevels from "./DisplayLevels";

const SectionMainHero = () => {
    const [levelState, setLevelState] = useState(null)

    const activateLink = (e) => {
        setLevelState(!levelState)
        const oldLevels = JSON.parse(window.localStorage.getItem("oldlevels"))
        if (oldLevels) {
            if (oldLevels.includes(e.target.id)) return;

            var token
            const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
            if (!tokenData) {
                history.push('/auth')
            }else{
                token = `Bearer ` + tokenData.access
            }

            axios.get(`${server.absolute_url}/questions`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then((res) => {
                if (res.status === 200) {
                    window.localStorage.setItem("categories", JSON.stringify(res.data))
                    e.target.classList.add("active")
                    oldLevels.push(e.target.id)
                    window.localStorage.setItem("oldlevels", JSON.stringify(oldLevels))
                }
            }).catch(err => console.log(err))
        }
        else{
            var token
            const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
            if (!tokenData) {
                history.push('/auth')
            }else{
                token = `Bearer ` + tokenData.access
            }

            axios.get(`${server.absolute_url}/questions`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then((res) => {
                if (res.status === 200) {
                    window.localStorage.setItem("categories", JSON.stringify(res.data))
                    e.target.classList.add("active")
                    window.localStorage.setItem("oldlevels", JSON.stringify([e.target.id]))
                }
            }).catch(err => console.log(err))
        }

    }

    useEffect(() => {
       const levels = JSON.parse(window.localStorage.getItem("oldlevels"))
          setTimeout(() => {
           if (levels){for (let level of levels){
            document.getElementById(level).classList.add("active")
        }}
    }, 1)
    }, [levelState])

    return ( 
        <div className="main-hero">
            <div className="difficulty-selection">
                <DisplayLevels activateLink={activateLink}/>
            </div>
            <div className="hero-section">
                <div className="intro-paragraph">
                    <p>Take time to see and learn from all the available questions and answers. If your down for it, take a <Link to='/quiz'>quiz</Link></p>
                </div>
            </div>
        </div>
    );
}
 
export default SectionMainHero;
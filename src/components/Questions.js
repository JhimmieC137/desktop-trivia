import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
// import { ipcRenderer } from "electron";


import server from '../utils'
import SectionPanelHandle from "./sections/SectionPanelHandle";

const Questions = () => {
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])
    const history = useHistory()
    const ipcRenderer = window.ipcRenderer;
    
    // const storeData = (signal, reciever, data) => {             // Maybe make this a separate component
    //     ipcRenderer.send(signal, (JSON.stringify(data)));
    //     // ipcRenderer.on(reciever, (statement) => {
    //     //     console.log(statement);
    //     // });
    //     window.electronApi.endStoreData()
    // }

    const getToken = () => {
        var token
        const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
        if (!tokenData) {
            history.push('/')
        }else{
            token = `Bearer ` + tokenData.access
        }

        return token
    }

    const getAllCategories = () => {
        fetch(server.absolute_url + '/categories',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
        }).then((res) => res.json())
        .then((replyData) => {
            setCategories(replyData);
            // console.log(replyData)
            // storeData('storeData', 'storeDataComlpete', replyData)
            })
        .catch((err) => {
            console.log(err.message);
            if (err.message.includes("Unauthorized")) 
            history.push('/')
        });

    }

    const getAllQuestions = () => { 

        fetch(server.absolute_url + '/questions',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        .then((res) => (res.json()))
        .then((data) => {
            setQuestions(data.questions);
        })
        .catch((err) => {
            console.log(err.message);
            if (err.message.includes("Unauthorized")) 
            history.push('/')
        });
    }

    const dataCheck = (status) => {
        // console.log(status)
        if (!status.check) {
            getAllCategories()
            getAllQuestions()
        }
        else{
            setCategories(JSON.parse(status.data))
            getAllCategories()
            getAllQuestions()
        }
    }

    
    
    useEffect(() => {

        ipcRenderer.send("categoryDataCheck", {});
        ipcRenderer.on("categoryDataCheckStatus", (res) => {
            dataCheck(res)
        })
        // window.electronApi.endCategoryDataCheck().
        window.electronApi.endStoreData()

    }, []);

    const getQuestionsById = (category_id) => {
        var token
        const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
        if (!tokenData) {
            history.push('/')
        }else{
            token = `Bearer ` + tokenData.access
        }

        fetch(`${server.absolute_url}/categories/${category_id}/questions`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then((res) => (res.json()))
        .then((data) => {
            setQuestions(data.questions);
        })
        .catch((err) => {
            console.log(err.message);
            if (err.message.includes("Unauthorized")) 
            history.push('/')
        });
    }

    const endSession = () => {
        var token
        const tokenData = JSON.parse(window.localStorage.getItem("tokens"))
        if (!tokenData) {
            history.push('/')
        }else{
            token = `Bearer ` + tokenData.access
        }

        let payload = tokenData.access.split('.')[1];
        payload = JSON.parse(window.atob(payload))
        
        axios.post(`${server.absolute_url}/sign-out`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        ).then((res) => console.log(res.data)).catch(err => console.log(err))

        window.localStorage.removeItem("tokens")
    }

    


    return ( 
        <div className="">
            <div className="side-panel">
                <div className="category-view">
                    <div className="panel-title">
                        <h3>
                            Categories
                        </h3>
                    </div>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.category_id} onClick={() => getQuestionsById(category.category_id)}>
                                {category.type}
                            </li>
                        ))}   
                    </ul>
                </div>
            <Link to='/' onClick={endSession} className="log-out">Log out</Link>
            </div>
            <SectionPanelHandle />
            <div className="display-panel">
                <div className="question-view">
                    <div className="panel-title">
                        <h3>
                            Questions
                        </h3>
                    </div>
                    <ul>
                        {questions.map((question) => (
                            <li key={question.question_id}>
                                <div className="question-group">
                                    <p className="question">{question.question}</p>
                                    <p className="answer"><strong>Answer: </strong> {question.answer}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Questions;
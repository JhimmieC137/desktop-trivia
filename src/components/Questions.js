import React from "react";
import { useState, useEffect } from "react";

import server from '../utils'
import SectionPanelHandle from "./sections/SectionPanelHandle";

const Questions = () => {
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {

        fetch(server.absolute_url + '/questions')
        .then((res) => (res.json()))
        .then((data) => {
            setQuestions(data.questions);
        })
        .catch((err) => {
            console.log(err.message);
        });

        fetch(server.absolute_url + '/categories')
           .then((res) => res.json())
           .then((data) => {
               setCategories(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
    }, []);

    const getQuestionsById = (category_id) => {
        fetch(`${server.absolute_url}/categories/${category_id}/questions`)
        .then((res) => (res.json()))
        .then((data) => {
            setQuestions(data.questions);
        })
        .catch((err) => {
            console.log(err.message);
        });
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
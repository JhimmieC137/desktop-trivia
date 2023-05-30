import React from "react";


const DisplayOptions = (props) => {
    const checkAnswer = props.checkAnswer
    const options = props.options

    return ( 
        <div id="answer-area" className="answer-area">
            {
                options.map((option, index) => (
                    <button key={index} onClick={(e) => {
                        checkAnswer(e);
                    }}>{ option }</button>
                ))
            }
        </div>
     );
}
 
export default DisplayOptions;
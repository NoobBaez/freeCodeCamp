import React from 'react';
import '../index.css';

const Quote = ({ randomQuote, getRandomQuote }) => {

    function handleClick(event) {
        event.preventDefault();
        getRandomQuote();
    };

    return (
        <div style={{ width: '50vw', padding: '2rem' }} id="quote-box">
            <div style={{ fontSize: '30px' }} id="text">
                <i style={{ marginRight: '10px' }} className="fas fa-quote-left"></i>
                {randomQuote.text}
            </div>
            <div id="author">{" -" + randomQuote.author}</div>
            <div id="wraper-buttons">
                <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${randomQuote.text + ' -' + randomQuote.author}`}>
                    <span fontSize="30px" color="black">
                        <i className="fab fa-twitter" style={{ color: "black", fontSize: "30px" }}></i>
                    </span>
                </a>
                <button
                    onClick={handleClick}
                    id="new-quote">Next</button>
            </div>
        </div>
    )

}

export default Quote;
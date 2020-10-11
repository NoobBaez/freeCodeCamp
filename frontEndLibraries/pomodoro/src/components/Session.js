import React from 'react';

const Session = () => {
    return (
        <div id="session">
            <label id="label">Session Duration</label>
            <button id="session-increment">
                +
            </button>
            <button id="session-decrement">
                -
            </button>
            <div id="session-length">
                25
            </div>

        </div>
    )
};

export default Session;
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { setDisplay } from '../redux/reducer';

const Pad = ({ text, sounds, setDisplay }) => {
    const [style, setStyle] = useState({
        backgroundColor: sounds[text].backgroundColor,
        boxShadow: sounds[text].boxShadow
    });

    const getKeyPress = useCallback((event) => {
        switch (event.keyCode) {
            case 81:
                handleMouseUp('Q');
                break;
            case 87:
                handleMouseUp('W');
                break;
            case 69:
                handleMouseUp('E');
                break;
            case 65:
                handleMouseUp('A');
                break;
            case 83:
                handleMouseUp('S');
                break;
            case 68:
                handleMouseUp('D');
                break;
            case 90:
                handleMouseUp('Z');
                break;
            case 88:
                handleMouseUp('X');
                break;
            default:
                handleMouseUp('C');
        };
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", getKeyPress, false);
        return () => {
            document.removeEventListener("keydown", getKeyPress, false);
        };
    }, [getKeyPress])

    function playAudio(text) {
        document.getElementById(text).play();
        setDisplay(sounds[text].title);
    };

    function handleMouseUp(key) {
        if (key !== text) return;
        playAudio(key);
        //reset the style
        setStyle({
            backgroundColor: sounds[key].backgroundColor,
            boxShadow: sounds[key].boxShadow
        });
    }

    function handleMouseDown() {
        setStyle({
            position: 'relative',
            top: '5px',
            left: '2.5px',
            height: '40px',
            width: '65px',
            backgroundColor: sounds[text].backgroundColor,
            boxShadow: sounds[text].boxShadow
        });
    };

    return (
        <div style={style} className="drum-pad" id={sounds[text].title} onMouseUp={() => handleMouseUp(text)} onMouseDown={handleMouseDown}>
            <audio className="clip" id={text} src={sounds[text]['src']} type="audio/mpeg" />
            {text}
        </div>
    );
};

const mapStateToPrors = state => {
    return {
        sounds: state.sounds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setDisplay: (title) => dispatch(setDisplay(title))
    }
};

export default connect(mapStateToPrors, mapDispatchToProps)(Pad);
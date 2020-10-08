const SET_DISPLAY = 'SET_DISPLAY';

const initState = {
    Q: {
        title: 'Perseo',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Kawai%20R50/16[kb]BASSELEC.aif.mp3`,
        backgroundColor: '#ffd500',
        boxShadow: '0px 20px #998000'
    },
    W: {
        title: 'Virgo',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Kawai%20R50/31[kb]BASSFNK1.aif.mp3`,
        backgroundColor: '#DE38C8',
        boxShadow: '0px 20px #841575'
    },
    E: {
        title: 'Andrómeda',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Kawai%20R50/18[kb]BASSFNK2.aif.mp3`,
        backgroundColor: '#652EC7',
        boxShadow: '0px 20px #401d7c'
    },
    A: {
        title: 'Pegaso',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Jomox%20MBrane%2011/225[kb]jmox-mbrane-r22b.wav.mp3`,
        backgroundColor: '#ffd500',
        boxShadow: '0px 20px #998000'
    },
    S: {
        title: 'Centauro',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Jomox%20MBrane%2011/212[kb]jmox-mbrane-r45b.wav.mp3`,
        backgroundColor: '#DE38C8',
        boxShadow: '0px 20px #841575'
    },
    D: {
        title: 'Casiopea',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Jomox%20MBrane%2011/231[kb]jmox-mbrane-r53b.wav.mp3`,
        backgroundColor: '#652EC7',
        boxShadow: '0px 20px #401d7c'
    },

    Z: {
        title: 'Acuario',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Pearl%20SC-40%20Kicks/31[kb]SC40BD07.aif.mp3`,
        backgroundColor: '#ffd500',
        boxShadow: '0px 20px #998000'
    },
    X: {
        title: 'Draco',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Roland%20T6%20Hats/55[kb]T6-Hats-12.wav.mp3`,
        backgroundColor: '#DE38C8',
        boxShadow: '0px 20px #841575'
    },
    C: {
        title: 'Fénix',
        src: `https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Roland%20T6%20Hats/163[kb]T6-Hats-1.wav.mp3`,
        backgroundColor: '#652EC7',
        boxShadow: '0px 20px #401d7c'
    }
};

export const reducer = (state = { sounds: initState, display: '' }, action) => {
    switch (action.type) {
        case SET_DISPLAY:
            return {
                ...state,
                display: action.title
            }
        default:
            return state;
    }
};

export const setDisplay = title => {
    return {
        type: SET_DISPLAY,
        title
    }
}
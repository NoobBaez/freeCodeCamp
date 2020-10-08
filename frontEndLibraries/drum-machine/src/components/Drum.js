import React from 'react';
import Pad from './Pad';
import Display from './Display';

const Drum = () => {
    return (
        <div id="drum-machine">
            <Display />
            <div id="drum-pads">
                <Pad text={'Q'} />
                <Pad text={'W'} />
                <Pad text={'E'} />

                <Pad text={'A'} />
                <Pad text={'S'} />
                <Pad text={'D'} />

                <Pad text={'Z'} />
                <Pad text={'X'} />
                <Pad text={'C'} />
            </div>

        </div>
    )
};

export default Drum;
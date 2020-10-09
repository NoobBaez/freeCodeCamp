import React from 'react';
import { connect } from 'react-redux';

import { setValue } from '../redux/reducer';

const Pad = ({ pad, setValue }) => {

    const handleClick = () => {
        setValue(pad.value);
    };

    return (
        <div id={pad.id} className="pad" onClick={handleClick}>
            {pad.value}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        setValue: (value) => dispatch(setValue(value))
    }
}

export default connect(null, mapDispatchToProps)(Pad);
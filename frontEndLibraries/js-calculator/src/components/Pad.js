import React from 'react';
import { connect } from 'react-redux';

import { setValue, setTotal } from '../redux/reducer';

const Pad = ({ pad, setValue, setTotal }) => {

    const handleClick = () => {
        if (pad.id === 'equals') {
            setTotal();
        } else {
            setValue(pad.value);
        }
    };

    return (
        <div id={pad.id} className="pad" onClick={handleClick}>
            {pad.value}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        setValue: (value) => dispatch(setValue(value)),
        setTotal: () => dispatch(setTotal())
    }
}

export default connect(null, mapDispatchToProps)(Pad);
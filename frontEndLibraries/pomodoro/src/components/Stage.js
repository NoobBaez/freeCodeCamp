import React from 'react';
import { connect } from 'react-redux';
import { incrementLength, decrementLength } from '../redux/actions';

const Stage = ({ type, length, increase, decrese }) => {

    const handleClickIncrease = (event) => {
        event.preventDefault();
        increase(type);
    };

    const handleClickDecrese = (event) => {
        event.preventDefault();
        decrese(type);
    };

    return (
        <div id={type}>
            <label  className="stage-label" id={`${type}-label`}>{`${type} Length`}</label>
            <button className="btn-stage" onClick={handleClickIncrease} id={`${type}-increment`}>+</button>
            <div id={`${type}-length`}>{length[type]}</div>
            <button  className="btn-stage" onClick={handleClickDecrese} id={`${type}-decrement`}>-</button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        length: state.length,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        increase: (type) => dispatch(incrementLength(type)),
        decrese: (type) => dispatch(decrementLength(type))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
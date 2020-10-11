import React from 'react';
import { connect } from 'react-redux';

const Display = ({ expression, value }) => {
    return (
        <div id="display">

            {expression || '0'}

            {/* {value} */}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        expression: state.expression,
        value: state.value
    }
};

export default connect(mapStateToProps, null)(Display);
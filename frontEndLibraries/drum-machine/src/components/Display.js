import React from 'react';
import { connect } from 'react-redux';

const Display = ({ title }) => {
    return (
        <div id="display">
            {title}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        title: state.display
    }
};

export default connect(mapStateToProps, null)(Display);
import React from 'react';
import { connect } from 'react-redux';
import { editEditor } from '../redux/actionsCreator';

const Editor = ({ state, editEditor }) => {

    function handleChange(event) {
        editEditor(event.target.value);
    }

    return (
        <textarea value={state} id="editor" onChange={handleChange} />
    );
};

const mapStateToProps = state => {
    return {
        state
    };
}

const mapDispathToProps = dispatch => {
    return {
        editEditor: (data) => dispatch(editEditor(data))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Editor);
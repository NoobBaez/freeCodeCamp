import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';


marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: true,
    smartLists: false,
    smartypants: false,
    xhtml: false
});

const Preview = ({ state }) => {
    return (
        <div id="preview" dangerouslySetInnerHTML={{ __html: marked(state) }} >
            
        </div>
    );
};

const mapStateToProps = state => {
    return {
        state
    }
};


export default connect(mapStateToProps, null)(Preview);
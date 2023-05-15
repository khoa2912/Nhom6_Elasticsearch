import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"


FileItem.propTypes = {
    name: PropTypes.string,
};

function FileItem(props) {
    if (props.name ){
        return (
            <div className='file-item'>
                <i className="bi bi-filetype-json file-icon"></i>
                <p className="file-name" >{props.name}</p>
            </div>
        );
    }
    
}

export default FileItem;
import React from 'react';

const Window = ({ icon, title, children }) => {
    return (
        <div className='window'>
            <div className="window-header">
                <i className={`fas ${icon}`}></i> {title}
            </div>
            {children}
        </div>
    )
}

export default Window;
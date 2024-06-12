import React from 'react';

const PageTitle = ({titleClass, title}) => {
    return (
        <h2 className={`${titleClass} block__title font-size-32 font-weight-600`}>{title}</h2>
    );
};

export default PageTitle;
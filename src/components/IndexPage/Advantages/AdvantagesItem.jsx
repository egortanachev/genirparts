import React from 'react';

const AdvantagesItem = ({ title, description, icon }) => {
    return (
        <div className="advantages__item">
            <img src={icon} alt={title} />
            <h4 className='font-size-18 font-weight-500'>{title}</h4>
            <p className='font-size-16'>{description}</p>
        </div>
    );
};

export default AdvantagesItem;
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="breadcrumbs">
            {items.map((item, index) => (
                <Link to={item.path} className='font-size-16'>{item.label}</Link>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
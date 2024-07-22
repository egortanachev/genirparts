import React from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';

const FilterBar = ({ filterOptions, selectedFilter, handleFilterChange, sortField, sortOrder, handleSortChange, location }) => (
    <div className="products__filter-settings">
        <div className="sort-select">
            <select id="sortField" onChange={handleSortChange} value={sortField === 'createdAt' && sortOrder === 'desc' ? 'default' : `${sortField}_${sortOrder}`}>
                <option value="default">По умолчанию</option>
                <option value="article_asc">Артикул (возрастание)</option>
                <option value="article_desc">Артикул (убывание)</option>
                <option value="price_asc">Цена (возрастание)</option>
                <option value="price_desc">Цена (убывание)</option>
                <option value="createdAt_asc">Дата добавления (возрастание)</option>
                <option value="createdAt_desc">Дата добавления (убывание)</option>
            </select>
        </div>
        {filterOptions.length > 0 && (
            <div className="filter-select">
                <select id="filterField" onChange={handleFilterChange} value={selectedFilter}>
                    <option value="">Все</option>
                    {filterOptions.map(option => (
                        <option key={option._id} value={option._id}>
                            {location.search.includes('category_id') ? option.manufacturer_name : option.category_name}
                        </option>
                    ))}
                </select>
            </div>
        )}
    </div>
);

FilterBar.propTypes = {
    filterOptions: PropTypes.array.isRequired,
    selectedFilter: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    sortField: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    handleSortChange: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default FilterBar;
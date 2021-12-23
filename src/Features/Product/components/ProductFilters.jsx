import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters({filters, onChange}) {
    const handleCategoryChange = (category) => {
        if(!onChange) return;

        const newFilters = {
            ...filters,
            'category.id': category.id,
            'category.name': category.name,
        };

        onChange(newFilters); //onChange là props
    }

    const handleChange = (values) => {
        if(onChange){
            onChange(values);
        }
    };
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange}/> 
            <FilterByPrice onChange={handleChange}/> 
            <FilterByService filters={filters} onChange={handleChange}/> 
            {/* onChange là event */}
        </Box>
    );
}

export default ProductFilters;
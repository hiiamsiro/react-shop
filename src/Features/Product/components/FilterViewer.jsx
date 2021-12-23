import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Chip } from '@mui/material';

const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = {...filters};
            if(newFilters.isFreeShip){
                delete newFilters.isFreeShip
            }else{
                newFilters.isFreeShip = true;
            }
            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.isPromotion
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_lte} đến ${filters.salePrice_gte}`,
        isActive: () => true,
        isVisible: (filters) => 
            Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters) => `Danh mục: ${filters['category.name']}`, //filters bên ListPage
        isActive: () => true,
        isVisible: (filters) => filters['category.id'],
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters['category.id'];
            delete newFilters['category.name'];
            return newFilters;
        },
        onToggle: (filters) => {},
    },
]

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({filters={}, onChange =  null}) {
    const useStyles = makeStyles({
        root: {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',

            padding: 0,
            margin: '16px',
            listStyleType: 'none',

            '& > li':{
                margin: 0,
                padding: '8px'
            }
        }
    })
    const classes = useStyles();

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    },[filters]);

    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip 
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        size="small"
                        onClick={
                            x.isRemovable 
                            ? null 
                            : () => {
                                if(!onChange) return;
                                const newFilters = x.onToggle(filters);
                                onChange(newFilters);
                            }
                        }
                        onDelete={
                            x.isRemovable 
                            ? () => {
                                if(!onChange) return;
                                    const newFilters = x.onRemove(filters);
                                    onChange(newFilters);
                            } 
                            : null
                        }
                    >
                    </Chip>
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
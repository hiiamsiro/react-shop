import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterByService({filters={}, onChange}) {

    const useStyles = makeStyles({
        root: {
            padding: '16px',
            borderTop: '1px solid darkgrey',
        },
        list: {
            padding: 0,
            margin: 0,
            listStyleType: 'none',

            '& > li': {
                margin: 0,
            }
        }
        
    })
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;

        const { name, checked } = e.target;
        if (onChange) onChange({[name]: checked})
        // truyền ví du như {isPromotion: true}
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DICH VỤ</Typography>
            
            <ul className={classes.list}>    
                {[
                    {value: 'isPromotion', label: 'Có khuyến mãi'}, 
                    {value: 'isFreeShip', label: 'Vận chuyển miễn phí'}
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color="primary"
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
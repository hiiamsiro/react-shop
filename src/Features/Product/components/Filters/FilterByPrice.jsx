import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice({onChange}) {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })

    const useStyles = makeStyles({
        root: {
            padding: '16px',
            borderTop: '1px solid darkgrey'
        },

        range: {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',

            marginTop: "8px",
            marginBottom: "8px",
            '& > span':{
                marginLeft: "8px",
                marginRight: "8px",
            }
        },
    })
    const classes = useStyles();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        if(onChange) onChange(values); 
        //truyền state values
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>
            <Box className={classes.range}>
                <TextField name="salePrice_gte" variant="standard" value={values.salePrice_gte} onChange={handleChange}/>
                <span>-</span>
                <TextField name="salePrice_lte" variant="standard" value={values.salePrice_lte} onChange={handleChange}/>
            </Box>
            <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;
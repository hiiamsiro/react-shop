import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatPrice } from 'utils/common';

ProductInfo.propTypes = {
    
};

function ProductInfo({product = {}}) {
    const {name, shortDescription, salePrice, originalPrice, promotionPercent} = product;

    const useStyles = makeStyles({
        root: {
            paddingBottom: "26px",
            borderBottom: '1px solid #e3e3e3'
        },
        description: {
            margin: "16px"
        },
        priceBox: {
            padding: "16px",
            backgroundColor: "#e3e3e3"
        },
        salePrice: {
            marginRight: "24px",
            fontSize: "30px",
            fontWeight: 'bold'
        },
        originalPrice: {
            marginRight: "16px",
            textDecoration: 'line-through'
        },
        
    })

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4">{name}</Typography>
            <Typography variant="body2" className={classes.description}>{shortDescription}</Typography>

            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>{formatPrice(salePrice)}</Box>
                {promotionPercent > 0 && (
                    <>
                        <Box component="span" className={classes.originalPrice}>
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box component="span">
                            {`-${product.promotionPercent}%`}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;
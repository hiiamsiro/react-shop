import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';
import Product from './Product';

ProductList.propTypes = {
    length: PropTypes.number,
};
ProductList.defaultProps = {
    data: [],
}

function ProductList({data}) {
    return (
        <Box>
            <Grid container>
                {data.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                        {/* Props bên Product là {product} bằng với product bên đây */}
                    </Grid>
                    
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
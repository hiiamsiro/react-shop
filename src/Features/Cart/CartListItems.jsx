import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import CartItems from './CartItems';

cartListItems.propTypes = {
    
};

function cartListItems({productCart, onSubmit = null, onSubmitRemove = null }) {
    const handleQtyChange = (newQuantity) => {
        if(!onSubmit) return;
        onSubmit(newQuantity);
    }

    const handleRemove = (newId) => {
        if (!onSubmitRemove) return;
        onSubmitRemove(newId);
    }   
    
    return (
        <Box>
            <Grid container>
                {productCart.map((items) => (
                    <Grid width="100%" item key={items.id}>
                        <CartItems onSubmit={handleQtyChange} onRemoveItem={handleRemove} data={items}/> 
                    </Grid> 
                ))}
            </Grid>
        </Box>
    );
}

export default cartListItems;
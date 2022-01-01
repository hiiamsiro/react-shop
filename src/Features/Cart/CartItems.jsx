import { Box, spacing } from '@mui/system';
import React from 'react';
import { STATIC_HOST } from '../../constants/common';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { Typography, Paper } from '@mui/material';
import { formatPrice } from '../../utils/common';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import QuantityField from './../../Components/form-controls/QuantityField/index';
import { Link } from 'react-router-dom';

CartItems.propTypes = {
    
};

function CartItems({data, onSubmit, onRemoveItem}) {
    const useStyles = makeStyles({
        root: {
            padding: '16px',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        image: {
            width: '150px',
            height: '150px'
        },
        cartInfo: {
            display: 'flex',
            alignItems: 'center'
        },
        cartInfoName: {
            paddingLeft: '10px'
        },
        salePrice: {

        },
        originalPrice: {
            textDecoration: 'line-through',
            color: '#DCDCDC'
        },
        cartRemove: {

        }
    })
    const classes = useStyles();
    const thumbnailUrl = data.product.thumbnail ? `${STATIC_HOST}${data.product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
    const {id, product, quantity} = data;
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter quantity')
            .min(1, 'Please enter at least 1')
            .typeError('Please enter a number'),
    });
    const form = useForm({
        defaultValues: {
            quantity: quantity,
        },
        resolver: yupResolver(schema)
    });

    const handleSubmitQtyForm = (quantity) => {
        handleSubmit(quantity);
    }

    const handleSubmit = (quantity) => {
        if(!onSubmit) return;
        const values = {
            id,
            quantity
        };
        onSubmit(values);
    }

    const handleRemoveItem =  (id) => {
        if (!onRemoveItem) return;
        onRemoveItem(id);
    }

    return (
        <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
            <Paper className={classes.cartInfo} elevation={0}>
                <img src={thumbnailUrl} alt={data.product.name} className={classes.image}/>
                <Box className={classes.cartInfoName} component='span'>
                    {data.product.name}
                    <Link component="button" variant="body2" onClick={() => handleRemoveItem(data.id)}>Xóa</Link>
                </Box>
                
            </Paper>
            <Paper elevation={0}>    
                <Typography className={classes.originalPrice}>{formatPrice(data.product.originalPrice)}</Typography>
                <Typography className={classes.salePrice}>{formatPrice(data.product.salePrice)}</Typography>
            </Paper>
            <QuantityField name="quantity" label="Quantity" form={form} onChangeRHF={handleSubmitQtyForm}/>
        </form>
    );
}

export default CartItems;
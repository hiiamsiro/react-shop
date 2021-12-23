import { Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import ProductThumbnail from './../components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom';
import useProductDetail from './../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const {
        params: {productId},
    } = useRouteMatch();

    const useStyles = makeStyles({
        root: {},
        left: {
            width: '400px',
            padding: '12px',
            borderRight: '1px solid grey'
        },
        right: {
            flex: '1 1 0',
            padding: '12px',
        },
        
    })

    const classes = useStyles();
    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return <Box>Loading</Box>
    }

    const handleAddToCartSubmit = (formValues) => {
        console.log('Form submit', formValues);
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product}></ProductThumbnail>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product}></ProductInfo>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
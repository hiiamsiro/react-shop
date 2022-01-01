import { Container, Grid, Paper, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import ProductThumbnail from './../components/ProductThumbnail';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import useProductDetail from './../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from './../components/ProductMenu';
import ProductDescription from './../components/ProductDescription';
import ProductAdditional from './../components/ProductAdditional';
import ProductReviews from './../components/ProductReviews';
import { useDispatch } from 'react-redux';
import { addToCart, showMiniCart } from 'Features/Cart/cartSlice';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const {
        params: {productId},
        url
    } = useRouteMatch();

    const dispatch = useDispatch();

    const useStyles = makeStyles({
        root: {
            paddingBottom: '24px',
        },
        left: {
            width: '400px',
            padding: '12px',
            borderRight: '1px solid grey'
        },
        right: {
            flex: '1 1 0',
            padding: '12px',
        },
        loading: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
        }
        
    })

    const classes = useStyles();
    const { product, loading } = useProductDetail(productId);

    if (loading) {
        return (
            <Box className={classes.loading}>
                <LinearProgress></LinearProgress>
            </Box>
        )
    }

    const handleAddToCartSubmit = (formValues) => {
        // console.log('Form submit', formValues);
        const action = addToCart({
            id: product.id,
            product,
            quantity: formValues.quantity,
        });
        dispatch(action);
        dispatch(showMiniCart());
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
                            <AddToCartForm onSubmit={handleAddToCartSubmit}></AddToCartForm>
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu></ProductMenu>

                <Switch>
                    {/* new way to use route with props */}
                    <Route exact path={url}>
                        <ProductDescription product={product}></ProductDescription>
                    </Route>
                    <Route path={`${url}/additional`} component={ProductAdditional}></Route>
                    <Route path={`${url}/reviews`} component={ProductReviews}></Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;
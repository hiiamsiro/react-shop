import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartTotalSelector,
  cartItemsCountSelector,
  cartItemsSelector,
} from "./selector";
import { Box } from "@mui/system";
import { Button, Container, Paper, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CartListItems from "./CartListItems";
import { formatPrice } from "./../../utils/common";
import {
  setQuantity,
  removeFromCart,
  removeAll,
} from "Features/Cart/cartSlice";

CartFeature.propTypes = {};

function CartFeature(props) {
  const useStyles = makeStyles({
    root: {
      paddingTop: "32px",
    },
    left: {
      width: "400px",
      padding: "12px",
      borderRight: "1px solid grey",
    },
    right: {
      flex: "1 1 0",
      padding: "12px",
    },
    cartCount: {
      paddingTop: "10px",
      paddingLeft: "10px",
    },
    totalPrice: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalPriceVat: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
    },
    checkout: {
      paddingTop: "15px",
    },
    checkoutBtn: {
      display: "inline-block",
      margin: "0 auto",
      width: "100%",
      textAlign: "center",
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const cartItemsCount = useSelector(cartItemsCountSelector);
  const cartTotal = useSelector(cartTotalSelector);

  const cartItems = useSelector(cartItemsSelector);

  const handleOnChangeItems = (newValues) => {
    const action = setQuantity({
      id: newValues.id,
      quantity: newValues.quantity,
    });
    dispatch(action);
  };

  const handleOnRemoveItems = (newId) => {
    const action = removeFromCart(newId);
    dispatch(action);
  };

  const handleCheckout = () => {
    dispatch(removeAll());
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ flex: "1 1 0" }}>
            <Paper elevation={0} sx={{ minHeight: "200px" }}>
              <Typography className={classes.cartCount} variant="subtitle2">
                GIỎ HÀNG: {Number.parseInt(cartItemsCount)} sản phẩm
              </Typography>

              <CartListItems
                productCart={cartItems}
                onSubmit={handleOnChangeItems}
                onSubmitRemove={handleOnRemoveItems}
              ></CartListItems>
            </Paper>
          </Grid>

          <Grid item sx={{ width: "300px" }}>
            <Paper elevation={0}>
              <Box className={classes.totalPrice}>
                <Typography>Tạm tính</Typography>
                <Typography variant="subtitle2">
                  {formatPrice(cartTotal)}
                </Typography>
              </Box>
              <Box className={classes.totalPriceVat}>
                <Typography>Thành tiền</Typography>
                <Paper elevation={0}>
                  <Typography
                    sx={{ color: "#D22B2B", textAlign: "center" }}
                    variant="h5"
                  >
                    {formatPrice(cartTotal)}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    (đã bao gồm VAT nếu có)
                  </Typography>
                </Paper>
              </Box>

              <Box className={classes.checkout}>
                <Button
                  className={classes.checkoutBtn}
                  onClick={handleCheckout}
                  color="primary"
                  size="small"
                  variant="contained"
                >
                  Thanh toán
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeature;

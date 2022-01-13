import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

MiniCart.propTypes = {};

function MiniCart({ onClose }) {
  const useStyles = makeStyles({
    root: {
      minWidth: "300px",
      minHeight: "100px",
      backgroundColor: "white",
      color: "black",
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      padding: "8px",
      position: "relative",
      borderRadius: "5px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      zIndex: 1,

      "&::before": {
        content: '""',
        position: "absolute",
        top: "-16px",
        right: "6px",
        borderStyle: "solid",
        borderWidth: "8px 10px",
        borderColor: "transparent transparent white transparent",
      },
    },
    message: {
      textAlign: "center",
      paddingBottom: "16px",
    },
    action: {
      display: "inline-block",
      padding: 0,
      margin: "0 auto",
    },
    closeBtn: {
      zIndex: 1,
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "20px",
      cursor: "pointer",
      opacity: "0.5",
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  const handleMiniCartClick = () => {
    history.push("/cart");
    handleClose();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.message}>Thêm vào giỏ hàng thành công!</Box>
      <Box className={classes.action}>
        <Button
          onClick={handleMiniCartClick}
          color="primary"
          size="small"
          variant="contained"
        >
          Xem giỏ hàng và thanh toán.
        </Button>
      </Box>
      <CloseIcon onClick={handleClose} className={classes.closeBtn}>
        X
      </CloseIcon>
    </Box>
  );
}

export default MiniCart;

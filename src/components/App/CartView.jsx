/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AppContext } from "./context";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export default function CartView() {
  const { setShowCart, setCount } = useContext(AppContext);
  const [cartState, setCartState] = useState({ products: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProdPrice, setTotalProdPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [pay, setPay] = useState(false);

  const calculateTotalPrice = (cart) => {
    let tax = 1.23;
    let taxTotal = 0;
    let prodTotal = 0; // all product total
    let prodEachTotal = 0; // product total
    // eslint-disable-next-line array-callback-return
    cart?.products.map((prod) => {
      let prodTax = 0; // product's tax total
      prodTax = (prod.price * prod.quantity * tax) / 100;
      taxTotal += prodTax;
      prodTotal += prod.price * prod.quantity + prodTax;
      prodEachTotal += prod.price * prod.quantity;
    });
    setTotalTax(taxTotal);
    setTotalPrice(prodTotal);
    setTotalProdPrice(prodEachTotal);
  };

  useEffect(() => {
    if (cartState?.products.length > 0) {
      calculateTotalPrice(cartState);
    } else {
      setCartState(JSON.parse(sessionStorage.getItem("cartList")));
    }
  }, [cartState]);

  if (!!cartState === false)
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity="warning">Nothing Added to Cart</Alert>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              setShowCart(false);
              window.location.reload();
            }}
          >
            Continue Shopping!
          </Button>
        </Grid>
      </Grid>
    );

  const setProductQuantity = (num, prodId) => {
    const foundIndex = cartState.products.findIndex(
      (x) => x.productId === prodId
    );
    const foundProduct = cartState.products[foundIndex];

    // updating qty in clicked product only
    if (foundIndex >= 0) {
      cartState.products[foundIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + num, // num id +1 and -1 as per increment and decrement call
      };
      setCartState({ ...cartState });
      if (cartState?.products[0].quantity === 0) {
        sessionStorage.removeItem("cartList");
        setCartState(null);
      } else {
        sessionStorage.setItem("cartList", JSON.stringify(cartState));
      }
    }
  };

  return !pay ? (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {cartState?.products.length > 0 && (
        <>
          <Grid item xs={12}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {cartState &&
                cartState.products?.map((product) => (
                  <>
                    {product.quantity > 0 && (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <Grid
                              container
                              spacing={2}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <ButtonGroup
                                  size="small"
                                  aria-label="small outlined button group"
                                >
                                  <Button
                                    onClick={() => {
                                      setProductQuantity(1, product.productId);
                                      setCount((count) => count + 1);
                                    }}
                                  >
                                    +
                                  </Button>

                                  <Button disabled>{product.quantity}</Button>
                                  <Button
                                    onClick={() => {
                                      setProductQuantity(-1, product.productId);
                                      setCount((count) => count - 1);
                                    }}
                                  >
                                    -
                                  </Button>
                                </ButtonGroup>
                              </Grid>
                              <Grid item>
                                <Typography>
                                  INR: {product.price * product.quantity}
                                </Typography>
                              </Grid>
                            </Grid>
                          }
                        >
                          <ListItemAvatar>
                            <img
                              height="20px"
                              width="20px"
                              src={product.image}
                              onerror="this.src = '../../_assets/images/alt.jpg'"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  INR: {product.price}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    )}
                  </>
                ))}
            </List>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setShowCart(false)}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid
                container
                pl="15px"
                pr="15px"
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography component="h6">Total Product Price:</Typography>
                </Grid>
                <Grid item>
                  <Typography>INR: {totalProdPrice.toFixed(2)}</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                pl="15px"
                pr="15px"
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography component="h6">Total Tax:</Typography>
                </Grid>
                <Grid item>
                  <Typography>INR: {totalTax.toFixed(2)}</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                pl="15px"
                pr="15px"
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography component="h6">Total Payable Price:</Typography>
                </Grid>
                <Grid item>
                  <Typography>INR: {totalPrice.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setPay(true);
                sessionStorage.removeItem("cartList");
                sessionStorage.clear();
                setCount(0);
              }}
            >
              Proceed To Pay
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  ) : (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Typography>
          <CheckCircleOutlineRoundedIcon color="success" fontSize="large" />
          Order Placed!
        </Typography>
      </Grid>
    </Grid>
  );
}

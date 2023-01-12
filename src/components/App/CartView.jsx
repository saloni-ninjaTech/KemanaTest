import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function CartView(props) {
  const { cartList, setShowCart } = props;
  const setProductQuantity = (num, prodId) => {
    const foundIndex = cartList.products.findIndex(
      (x) => x.productId === prodId
    );
    const foundProduct = cartList.products[foundIndex];

    // updating qty in clicked product only
    if (foundIndex >= 0) {
      cartList.products[foundIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + num, // num id +1 and -1 as per increment and decrement call
      };
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {cartList.products.map((product) => (
            <>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={() => setProductQuantity(1, product.productId)}
                    >
                      +
                    </Button>
                    {product.quantity && (
                      <Button disabled>{product.quantity}</Button>
                    )}
                    {product.quantity && (
                      <Button
                        onClick={() =>
                          setProductQuantity(-1, product.productId)
                        }
                      >
                        -
                      </Button>
                    )}
                  </ButtonGroup>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={product.image}
                    variant="square"
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
                        Quantity: {product.quantity}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
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
    </Grid>
  );
}

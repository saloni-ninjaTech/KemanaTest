import React, { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AppContext } from "./context";

const AddToCart = debounce((product, cartState, setCount, setIsOpen) => {
  let newProduct = {
    productId: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
    image: product.image,
  };

  // checking whether product already exist in cart
  const foundIndex = cartState.products.findIndex(
    (x) => x.productId === product.id
  );
  const foundProduct = cartState.products[foundIndex];

  if (foundIndex < 0) {
    // if product don't exist then adding as new product
    cartState.products.push(newProduct);
  } else {
    // if product exist then updating qty
    cartState.products[foundIndex] = {
      ...foundProduct,
      quantity: foundProduct.quantity + 1,
    };
  }

  setCount((count) => count + 1);
  setIsOpen(true);
  sessionStorage.setItem("cartList", JSON.stringify(cartState));
}, 500);

export default function AddToCartButton(props) {
  const { cartList, setCount } = useContext(AppContext);
  const { product } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [cartState, setCartState] = useState(cartList);
  useEffect(() => {
    setCartState(JSON.parse(sessionStorage.getItem("cartList")) || cartList);
  }, [cartList]);
  const handleClick = (product, cartState) => {
    console.log("carrt:", cartState);
    if (cartState) {
      AddToCart(product, cartState, setCount, setIsOpen);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          handleClick(product, cartState);
        }}
      >
        Add to Cart
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added to Cart..!
        </Alert>
      </Snackbar>
    </>
  );
}

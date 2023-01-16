import React, { useContext, useState } from "react";
import { debounce } from "lodash";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AppContext } from "./context";

const AddToCart = debounce((product, cartList, setCount, setIsOpen) => {
  let newProduct = {
    productId: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
  };

  // checking whether product already exist in cart
  const foundIndex = cartList.products.findIndex(
    (x) => x.productId === product.id
  );
  const foundProduct = cartList.products[foundIndex];

  if (foundIndex < 0) {
    // if product don't exist then adding as new product
    cartList.products.push(newProduct);
  } else {
    // if product exist then updating qty
    cartList.products[foundIndex] = {
      ...foundProduct,
      quantity: foundProduct.quantity + 1,
    };
  }

  setCount((count) => count + 1);
  setIsOpen(true);
  sessionStorage.setItem("cartList", JSON.stringify(cartList));
}, 1000);

export default function AddToCartButton(props) {
  const { cartList, setCount } = useContext(AppContext);
  const { product } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (product, cartList) => {
    AddToCart(product, cartList, setCount, setIsOpen);
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => {
          handleClick(product, cartList);
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

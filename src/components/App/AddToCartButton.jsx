import React from "react";
import Button from "@mui/material/Button";

export default function AddToCartButton(props) {
  const { product, cartList, setShowCart } = props;
  const AddToCart = (product) => {
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
  };
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      onClick={() => {
        AddToCart(product);
        setShowCart(true);
      }}
    >
      Add to Cart
    </Button>
  );
}

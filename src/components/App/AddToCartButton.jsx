import React from "react";
import Button from "@mui/material/Button";

export default function AddToCartButton(props) {
  const { product, cartList } = props;
  const AddToCart = (product) => {
    let newProduct = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };

    const foundIndex = cartList.products.findIndex(
      (x) => x.productId === product.id
    );
    console.log("found index:", cartList.products[foundIndex]);
    const foundProduct = cartList.products[foundIndex];

    if (foundIndex < 0) {
      cartList.products.push(newProduct);
    } else {
      cartList.products[foundIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
    }
    console.log("cartt:", cartList);
  };
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      onClick={() => AddToCart(product)}
    >
      Add to Cart
    </Button>
  );
}

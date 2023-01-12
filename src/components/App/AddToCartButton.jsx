import React from "react";
import Button from "@mui/material/Button";

export default function AddToCartButton(props) {
  const { product, cartList } = props;
  const AddToCart = (product) => {
    let newProduct = {
      price: product.price,
      productId: product.id,
      quantity: 1,
      title: product.title,
    };
    let isExist = cartList.products.filter(
      (prod) => prod.productId === product.id
    );

    if (isExist.length() > 0) {
      isExist.map((cart) =>
        cart.map((prod) => {
          return prod.productId === product.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : cart.push(newProduct);
        })
      );
    } else {
      cartList.products.push(newProduct);
    }
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

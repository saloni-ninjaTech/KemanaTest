import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AddToCartButton from "./AddToCartButton";

export default function SelectedProduct(props) {
  const { onClose, selectedValue, open, productList } = props;

  // filtering particular product
  const product = productList.filter((prod) => prod.id === selectedValue);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Product View</DialogTitle>
      {product.map((prod) => (
        <Paper>
          <Card>
            <CardMedia
              component="img"
              height="140px"
              image={prod.image}
              alt={prod.title}
            />

            <CardContent sx={{ height: "100px", width: "400px" }}>
              <Typography gutterBottom variant="h6" component="div">
                {prod.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {prod.description}
              </Typography>
            </CardContent>
            <CardActions>
              <AddToCartButton product={product} {...props} />
            </CardActions>
          </Card>
        </Paper>
      ))}
    </Dialog>
  );
}

SelectedProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

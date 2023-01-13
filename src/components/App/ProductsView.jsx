import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import SelectedProduct from "./SelectedProduct";
import AddToCartButton from "./AddToCartButton";
import { AppContext } from "./context";
import AltImg from "../../_assets/images/alt.png";

export default function ProductsView() {
  const { productList } = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(""); // selected product id value
  // dialog open
  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedValue(id);
  };
  // dialog close
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid container spacing={2}>
      {productList.map((product) => (
        <Grid item xs={3} key={product.id}>
          <Card>
            <CardActionArea onClick={() => handleClickOpen(product.id)}>
              <CardMedia
                component="img"
                height="140px"
                image={product.image}
                onError={(e) => {
                  e.target.src = AltImg;
                }}
              />

              <CardContent sx={{ height: "100px" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  INR: {product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <AddToCartButton product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
      <SelectedProduct
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Grid>
  );
}

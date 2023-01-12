import "../../_styles/App.css";
import Header from "./Header";
import ProductsView from "./ProductsView";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CartView from "./CartView";

function App(props) {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header setShowCart={setShowCart} showCart={showCart} />
        </Grid>
        <Grid item xs={12}>
          {!showCart ? (
            <ProductsView {...props} setShowCart={setShowCart} />
          ) : (
            <CartView {...props} setShowCart={setShowCart} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

import "../../_styles/App.css";
import Header from "./Header";
import ProductsView from "./ProductsView";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CartView from "./CartView";
import { AppContext } from "./context";

function App(props) {
  const [showCart, setShowCart] = useState(false);
  const [count, setCount] = useState(props.cartList.products.length);

  return (
    <div className="App">
      <AppContext.Provider
        value={{ ...props, showCart, setShowCart, count, setCount }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            {!showCart ? <ProductsView /> : <CartView />}
          </Grid>
        </Grid>
      </AppContext.Provider>
    </div>
  );
}

export default App;

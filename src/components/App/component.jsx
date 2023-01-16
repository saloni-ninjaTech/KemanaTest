import "../../_styles/App.css";
import Header from "./Header";
import ProductsView from "./ProductsView";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import CartView from "./CartView";
import { AppContext } from "./context";

function App(props) {
  const [showCart, setShowCart] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(
      JSON.parse(sessionStorage.getItem("cartList"))?.products?.reduce(
        (acc, obj) => {
          return acc + Number(obj.quantity);
        },
        0
      ) || 0
    );
  }, []);

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

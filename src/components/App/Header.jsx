import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AppContext } from "./context";
import { Grid } from "@mui/material";

// this page will be similar everywhere

export default function Header() {
  const { setShowCart, count } = useContext(AppContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={11}>
              <div sx={{ width: "fit-content" }}>
                <Typography
                  variant="h6"
                  component="a"
                  sx={{
                    flexGrow: 1,
                    width: "fit-content !important",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowCart(false);
                    window.location.reload();
                  }}
                >
                  KEMANA
                </Typography>
              </div>
            </Grid>
            <Grid item xs={1}>
              <div>
                <Badge badgeContent={count} color="success">
                  <IconButton
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => setShowCart(true)}
                    color="inherit"
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>
                </Badge>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

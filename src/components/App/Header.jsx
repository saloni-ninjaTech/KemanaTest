import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AppContext } from "./context";

// this page will be similar everywhere

export default function Header() {
  const { setShowCart, count } = useContext(AppContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KEMANA
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

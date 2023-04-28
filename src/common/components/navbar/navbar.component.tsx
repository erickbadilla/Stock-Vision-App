import { AppBar, Toolbar, Typography } from "@mui/material";
import { FunctionComponent } from "react";

export const NavBar: FunctionComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Stock Vision</Typography>
      </Toolbar>
    </AppBar>
  );
};

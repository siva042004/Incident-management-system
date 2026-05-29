import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function Navbar() {
  const location = useLocation();

  const navStyle = (path) => ({
    color: "white",
    fontWeight: location.pathname === path ? "bold" : "normal",
    borderBottom: location.pathname === path ? "2px solid white" : "none",
    borderRadius: 0,
    marginLeft: 8,
  });

  return (
    <AppBar position="static" style={{ backgroundColor: "#1A3C5E" }}>
      <Toolbar>
        <WarningAmberIcon style={{ marginRight: 10 }} />
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold" }}>
          Incident Management System
        </Typography>
        <Box>
          <Button component={Link} to="/" style={navStyle("/")}>
            Dashboard
          </Button>
          <Button component={Link} to="/incidents" style={navStyle("/incidents")}>
            Incidents
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

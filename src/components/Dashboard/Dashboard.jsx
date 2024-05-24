import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";

const activeStyle = {
  textDecoration: "none",
  color: "blue", // Change this to the desired active color
};

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let user_Initail = userInfo.username[0];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from local storage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#8a8a8f" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Management Dashboard
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{user_Initail}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem
              component={NavLink}
              to="company-profile"
              sx={{ backgroundColor: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="branch-management"
              sx={{ color: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Branch Management" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="region-management"
              sx={{ color: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Region Management" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="products"
              sx={{ color: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="buyers"
              sx={{ color: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Buyers" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="sellers"
              sx={{ color: "inherit" }}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ListItemText primary="Sellers" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;

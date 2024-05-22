import { NavLink, Outlet } from "react-router-dom";
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
  textDecoration: 'none',
  color: 'blue', // Change this to the desired active color
};

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#8a8a8f" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Management Dashboard
          </Typography>
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
            <ListItem component={NavLink} to="company-profile" sx={{ backgroundColor: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem component={NavLink} to="branch-management" sx={{ color: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Branch Management" />
            </ListItem>
            <ListItem component={NavLink} to="region-management" sx={{ color: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Region Management" />
            </ListItem>
            <ListItem component={NavLink} to="products" sx={{ color: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem component={NavLink} to="buyers" sx={{ color: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Buyers" />
            </ListItem>
            <ListItem component={NavLink} to="sellers" sx={{ color: 'inherit' }} 
              style={({ isActive }) => isActive ? activeStyle : undefined}>
              <ListItemText primary="Sellers" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;

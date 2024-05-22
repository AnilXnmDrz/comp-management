// import React from 'react';
// import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
// import { Business, Edit, InsertChart } from '@mui/icons-material';
import ProfileCard from "./ProfileCard";
import { Grid } from "@mui/material";
import Banner from "./Banner";
import data from "../Sample/sample_data.json";

const CompanyProfile = () => {
  

  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={1000} md={8}> */}
      <Banner
        logo={data.logo}
        companyName={data.companyName}
        companyDetails={data.companyDetails}
      />
      {/* </Grid> */}

      <Grid item xs={12} md={4}>
        <ProfileCard items={data.products} sector={"Product"} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProfileCard items={data.regions} sector={"Region"} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProfileCard items={data.branches} sector={"Branch"} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProfileCard items={data.sellers} sector={"Seller"} />
      </Grid>
    
    </Grid>
  );
};

export default CompanyProfile;

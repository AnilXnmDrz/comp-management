// import React from 'react';
// import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
// import { Business, Edit, InsertChart } from '@mui/icons-material';
import ProfileCard from "./ProfileCard";
import { Grid } from "@mui/material";
import Banner from "./Banner";
import data from "../Sample/sample_data.json";

const CompanyProfile = () => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <>
      <Banner
        logo={data.logo}
        companyName={userInfo.company.name}
        companyDetails={data.companyDetails}
      />
      <div style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={3}>
            <ProfileCard resource={data.products} sector={"Product"} />
          </Grid>
          <Grid item xs={10} md={3}>
            <ProfileCard resource={data.regions} sector={"Region"} />
          </Grid>
          {/* <Grid item xs={10} md={3}>
            <ProfileCard resource={data.branches} sector={"Branch"} />
          </Grid>
          <Grid item xs={10} md={3}>
            <ProfileCard resource={data.Suppliers} sector={"Seller"} />
          </Grid>
          <Grid item xs={10} md={3}>
            <ProfileCard resource={data.Suppliers} sector={"Seller"} />
          </Grid>
          <Grid item xs={10} md={3}>
            <ProfileCard resource={data.Suppliers} sector={"Seller"} />
          </Grid> */}
          
        </Grid>
      </div>
    </>
  );
};

export default CompanyProfile;

/* eslint-disable react/prop-types */
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DonutChart } from "../Graphs/DonutChart";
import Registration from "./Registration";
import data from '../Sample/sample_data.json'

const Banner = ({ logo, companyName, companyDetails }) => {
  
  return (
    <Box
      sx={{
        display: "flex",
        padding: 4,
        border: "1px solid #ccc",
        borderRadius: "16px",
        backgroundColor: "#f9f9f9",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "100%",
        margin: "20px 20px 30px 40px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: 50, marginRight: 16 }}
            />
            <Typography variant="h6" component="div">
              {companyName}
            </Typography>

            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <Registration />
          </div>
          <Typography variant="body1" component="div">
            {companyDetails}
          </Typography>
        </div>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* <Typography variant="body2" sx={{ marginBottom: 1 }}>
          sales
        </Typography> */}
        <DonutChart data={data.graph_Data} width={500} height={250} />
      </Box>
    </Box>
  );
};

export default Banner;

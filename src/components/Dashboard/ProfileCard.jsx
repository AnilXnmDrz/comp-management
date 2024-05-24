/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import http from "../service/apiClient";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../service/FormDialog";

// Utility function to get nested property value
const getNestedValue = (obj, path) => {
  return path.split("->").reduce((acc, part) => acc && acc[part.trim()], obj);
};

// Component to render key-value pairs based on the specified properties
const KeyValueDisplay = ({ data, properties }) => {
  const renderProperty = (data, property) => {
    const [key, nestedKey] = property.includes("->")
      ? property.split("->").map((part) => part.trim())
      : [property, null];
    const value = nestedKey ? getNestedValue(data, nestedKey) : data[key];

    return (
      <div key={property} style={{ marginBottom: "8px" }}>
        <strong>{key}: </strong>
        <span>{String(value)}</span>
      </div>
    );
  };

  return (
    <div>{properties.map((property) => renderProperty(data, property))}</div>
  );
};

const ProfileCard = ({ resource }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { sector, endpoint, properties, newEntry } = resource;

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    try {
      const response = await http.request(endpoint);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (success) => {
    setDialogOpen(false);
    if (success) {
      // Optionally refresh data
      setLoading(true);
      fetchData();
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: "auto", backgroundColor: "#ddd" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              {sector}
              <IconButton onClick={() => setDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>
              {data.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {item.name || `Item ${index + 1}`}
                  </AccordionSummary>
                  <AccordionDetails>
                    <KeyValueDisplay data={item} properties={properties} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        formData={newEntry.form}
        apiMethod={newEntry.apiMethod}
        endpoint={newEntry.endpoint}
      />
    </TableContainer>
  );
};

export default ProfileCard;

// src/components/ProfileCard.js
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog from "../service/FormDialog";
import KeyValueDisplay from "../service/KeyValueDisplay";

const ProfileCard = ({ resource }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { sector, endpoint, properties, newEntry, editEntry, deleteEntry } =
    resource;

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
      fetchData();
    }
  };

  const handleEditDialogClose = (success) => {
    setEditDialogOpen(false);
    setCurrentItem(null);
    if (success) {
      fetchData();
    }
  };

  const handleDeleteDialogClose = async (confirm) => {
    if (confirm && currentItem) {
      try {
        const url = deleteEntry.endpoint.replace(":id", currentItem.id);
        await http.delete(url);
        fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
    setDeleteDialogOpen(false);
    setCurrentItem(null);
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
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        onClick={() => {
                          setEditDialogOpen(true);
                          setCurrentItem(item);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setDeleteDialogOpen(true);
                          setCurrentItem(item);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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
      {currentItem && (
        <FormDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          formData={editEntry.form}
          apiMethod={editEntry.apiMethod}
          endpoint={editEntry.endpoint}
          initialData={currentItem}
        />
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => handleDeleteDialogClose(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteDialogClose(true)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProfileCard;

/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import http from "../service/apiClient";

const FormDialog = ({ open, onClose, formData, apiMethod, endpoint }) => {
  const [formState, setFormState] = useState(
    Object.keys(formData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = formData[name] === "number" ? parseFloat(value) : value;
    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    try {
      await saveData();
      onClose(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      onClose(false);
    }
  };

  const saveData = async () => {
    // formState.price = 101;
    let data = JSON.stringify(formState);

    let config = {
      method: apiMethod,
      url: endpoint,
      data: data,
    };
    return new Promise((resolve, reject) => {
      http
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>New Entry</DialogTitle>
      <DialogContent>
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            margin="dense"
            name={key}
            label={key}
            type={formData[key]}
            fullWidth
            value={formState[key]}
            onChange={handleInputChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;

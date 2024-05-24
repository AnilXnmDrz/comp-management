import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import http from "../service/apiClient";
import { getNestedValue } from "../service/KeyValueDisplay";
import { useSnackbar } from "./SnackbarContext";

const FormDialog = ({
  open,
  onClose,
  formData,
  apiMethod,
  endpoint,
  initialData,
}) => {
  const { showSnackbar } = useSnackbar();
  const [formState, setFormState] = useState(
    formData.reduce((acc, field) => {
      acc[field.displayname] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    if (initialData) {
      const populatedFormState = formData.reduce((acc, field) => {
        const value =
          field.path === field.displayname
            ? initialData[field.displayname]
            : getNestedValue(initialData, field.path);
        acc[field.displayname] =
          value !== undefined && value !== null
            ? field.type === "number"
              ? parseFloat(value)
              : String(value)
            : "";
        return acc;
      }, {});

      setFormState(populatedFormState);
    }
  }, [initialData, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      formData.find((field) => field.displayname === name).type === "number"
        ? parseFloat(value)
        : value;
    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    try {
      await saveData();
      onClose(true);
      showSnackbar('Entry successfull', "success");

    } catch (error) {
      onClose(false);
      showSnackbar(error, "error");
    }
  };

  const saveData = async () => {
    let data = JSON.stringify(formState);
    let url = endpoint;

    if (initialData && endpoint.includes(":id")) {
      url = endpoint.replace(":id", initialData.id);
    }

    let config = {
      method: apiMethod,
      url: url,
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
          reject(error.message);
        });
    });
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{initialData ? "Edit Entry" : "New Entry"}</DialogTitle>
      <DialogContent>
        {formData.map((field) => (
          <TextField
            key={field.displayname}
            margin="dense"
            name={field.displayname}
            label={field.displayname}
            type={field.type}
            fullWidth
            value={formState[field.displayname]}
            onChange={handleInputChange}
            disabled={
              Object.prototype.hasOwnProperty.call(field, "disable_edit")
                ? true
                : false
            }
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

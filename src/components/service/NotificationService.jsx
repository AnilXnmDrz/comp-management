import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "./SnackbarContext";

function NotificationService() {

  const { snackbar, hideSnackbar } = useSnackbar();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideSnackbar()
  };

  return (
    <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose } anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationService;

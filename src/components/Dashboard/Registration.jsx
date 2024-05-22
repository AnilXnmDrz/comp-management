import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { IconButton } from "@mui/material";

function Registration() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <AppRegistrationIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const {CompanyCode, CompanyName, CompanyAddress} = formJson;
            console.log(CompanyCode, CompanyName, CompanyAddress)
            /**
             * INSERT INTO companies (code, name, address) VALUES (CompanyCode, CompanyName, CompanyAddress)
             */
            handleClose();
          },
        }}
      >
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill all the detail to register your company
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="CompanyCode"
            name="CompanyCode"
            label="Company Code"
            type="number"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="CompanyName"
            name="CompanyName"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="CompanyAddress"
            name="CompanyAddress"
            label="Company Address"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Registration
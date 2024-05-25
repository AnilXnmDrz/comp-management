import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import http from "../service/apiClient";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { useSnackbar } from "../service/SnackbarContext";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { showSnackbar } = useSnackbar();

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = async () => {
    try {
      await http.delete(`api/users/${selectedUser.id}`);
      showSnackbar("User deleted", "success");
      fetchData();
    } catch (error) {
      showSnackbar("Error deleting user", "error");
    } finally {
      handleCloseDeleteDialog();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await getUsers();
      const accessResponse = await getAccess();
      if (
        usersResponse.data.status_code === "REBEL-200" &&
        accessResponse.data.status_code === "REBEL-200"
      ) {
        setUsers(usersResponse.data.data);
        setAccessList(accessResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    let config = {
      method: "get",
      url: "api/users",
    };
    return http.request(config);
  };

  const getAccess = async () => {
    let config = {
      method: "get",
      url: "api/access",
    };
    return http.request(config);
  };

  const requestAccessAlias = (roleId) => {
    const access = accessList.find((access) => access.id === roleId);
    return access ? access.alias : "N/A";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Access</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.roles.map((role) => role.Name).join(", ")}
                </TableCell>
                <TableCell>{user.branch ? user.branch.name : "N/A"}</TableCell>
                <TableCell>
                  {user.roles
                    .map((role) => requestAccessAlias(role.ID))
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <AddUser open={open} onClose={handleClose} />
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        {/* <EditUser open={openEditDialog} onClose={handleCloseEditDialog} userData={selectedUser} /> */}
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user {selectedUser?.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;

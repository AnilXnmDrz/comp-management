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
} from "@mui/material";
import http from "../service/apiClient";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
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
    fetchData()
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
                  <IconButton>
                    <EditIcon />
                    {/* <EditUser open={openEditDialog} onClose={handleCloseEditDialog} userData={user} /> */}
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
    </>
  );
};

export default UserTable;

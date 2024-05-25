import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  FormGroup,
  Paper,
} from "@mui/material";
import http from "../service/apiClient";
import { useSnackbar } from "../service/SnackbarContext";

const AddUser = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [branches, setBranches] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [filteredAccessList, setFilteredAccessList] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    is_active: true,
    branch: "",
    roles: "", // Single role from dropdown
    access: [], // Access list from checkboxes
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await http.get("api/branches?=");
        if (response.data.status_code === "REBEL-200") {
          setBranches(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchAccess = async () => {
      try {
        const response = await http.get("api/access");
        if (response.data.status_code === "REBEL-200") {
          setAccessList(response.data.data);
          setFilteredAccessList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await http.get("api/roles");
        if (response.data.status_code === "REBEL-200") {
          setRoles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchBranches();
    fetchAccess();
    fetchRoles();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    setForm((prevState) => {
      const access = prevState.access.includes(id)
        ? prevState.access.filter((accessId) => accessId !== id)
        : [...prevState.access, id];
      return { ...prevState, access };
    });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filtered = accessList.filter((access) =>
      access.alias.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAccessList(filtered);
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRole(value);
    setForm((prevState) => ({ ...prevState, roles: value }));
  };

  const handleSubmit = async () => {
    // Handle form submission here
    console.log(form);
    // Close dialog after form submission
    try {
      await createUser();
      await grantRole_Access();
      showSnackbar("new user added", "success");
    } catch (error) {
      showSnackbar("Fail to create user", "error");
    }
    onClose();
  };

  const createUser = async () => {
    let userData = JSON.stringify({
      username: form.username,
      email: form.email,
      password: form.password,
      re_password: form.re_password,
      is_active: form.is_active,
      branch: form.branch,
      roles: [
        {
          id: form.roles,
        },
      ],
    });
    let config = {
      method: "post",
      url: "api/users",
      data: userData,
    };

    return await http.request(config);
  };

  const grantRole_Access = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "",
    };
    for (const permission of form.access) {
      try {
        config.url = `api/roles/${form.roles}/access/${permission}`;
        await http.request(config);
      } catch (error) {
        continue;
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent
        style={{ width: "100%", height: "500px", overflow: "auto" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Add User Tabs"
        >
          <Tab label="User Detail" />
          <Tab label="User Role" />
          <Tab label="Summary" />
        </Tabs>
        <Box hidden={tabValue !== 0} p={2}>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            name="username"
            value={form.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Re-enter Password"
            type="password"
            fullWidth
            name="re_password"
            value={form.re_password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Branch"
            select
            fullWidth
            name="branch"
            value={form.branch}
            onChange={handleInputChange}
          >
            {branches.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.is_active}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    is_active: e.target.checked,
                  }))
                }
                name="is_active"
                color="primary"
              />
            }
            label="Is Active"
          />
        </Box>
        <Box hidden={tabValue !== 1} p={2}>
          <TextField
            margin="dense"
            label="Select Role"
            select
            fullWidth
            name="roles"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Search Access"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Paper
            style={{
              maxHeight: 200,
              overflow: "auto",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <FormGroup>
              {filteredAccessList.map((access) => (
                <FormControlLabel
                  key={access.id}
                  control={
                    <Checkbox
                      checked={form.access.includes(access.id)}
                      onChange={() => handleCheckboxChange(access.id)}
                      name="access"
                    />
                  }
                  label={access.alias}
                />
              ))}
            </FormGroup>
          </Paper>
        </Box>
        <Box hidden={tabValue !== 2} p={2}>
          <Typography variant="h6">Summary</Typography>
          <Typography>Username: {form.username}</Typography>
          <Typography>Email: {form.email}</Typography>
          <Typography>
            Branch: {branches.find((branch) => branch.id === form.branch)?.name}
          </Typography>
          <Typography>
            Role: {roles.find((role) => role.id === form.roles)?.name}
          </Typography>
          <Typography>
            Access:{" "}
            {form.access
              .map(
                (accessId) =>
                  accessList.find((access) => access.id === accessId)?.alias
              )
              .join(", ")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

AddUser.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUser;

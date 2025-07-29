import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { switchRole, setUser } from "../redux/slices/roleSlice";
import { addMember } from "../redux/slices/membersSlice";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Typography,
} from "@mui/material";



function Header() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.currentRole);
  const user = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    id: nanoid(),
    name: "",
    role: "member",
    status: "Offline",
    tasks: [],
  });

  const handleUserChange = (e) => {
    dispatch(setUser(e.target.value));
  };

  const handleRoleChange = (e) => {
    dispatch(switchRole(e.target.value));
  };

  const handleAddMember = () => {
    if (newMember.name.trim()) {
      dispatch(addMember({ id: Date.now(), ...newMember }));
      setNewMember({ id: nanoid(), name: "", role: "member", status: "Offline", tasks: [] });
      setIsModalOpen(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        position: "relative",
      }}
    >
      <FormControl sx={{ minWidth: 350 }} size="small">
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          value={user}
          label="Select User"
          onChange={handleUserChange}
        >
          {members.map((m) => (
            <MenuItem key={m.id} value={m.name}>
              {m.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 350 }} size="small">
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          value={role}
          label="Role"
          onChange={handleRoleChange}
        >
          <MenuItem value="lead">Team Lead</MenuItem>
          <MenuItem value="member">Team Member</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Add Member
      </Button>

       {isModalOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: 4,
            zIndex: 10,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Member
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="new-member-role-label">Role</InputLabel>
            <Select
              labelId="new-member-role-label"
              value={newMember.role}
              label="Role"
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            >
              <MenuItem value="member">Team Member</MenuItem>
              <MenuItem value="lead">Team Lead</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="new-member-status-label">Status</InputLabel>
            <Select
              labelId="new-member-status-label"
              value={newMember.status}
              label="Status"
              onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
            >
              <MenuItem value="Working">Working</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={() => setIsModalOpen(false)} variant="outlined" size="small">
              Cancel
            </Button>
            <Button onClick={handleAddMember} variant="contained" color="success" size="small">
              Add
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Header;
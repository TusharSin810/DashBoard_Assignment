import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

function TaskForm({ members }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selected, setSelected] = useState(members[0]?.name || '');
  const dispatch = useDispatch();

  const submit = () => {
    if (!title || !dueDate || !selected) return;
    dispatch(assignTask({
      memberName: selected,
      task: { title, dueDate },
    }));
    setTitle('');
    setDueDate('');
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 4/5,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color='black'>
        Assign Task
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="select-member-label">Select Member</InputLabel>
        <Select
          labelId="select-member-label"
          value={selected}
          label="Select Member"
          onChange={(e) => setSelected(e.target.value)}
        >
          {members.map((m) => (
            <MenuItem key={m.id} value={m.name}>
              {m.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        size="small"
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
        inputLabel: {
          shrink: true,
        },
         }}
      />

      <Button variant="contained" color="success" fullWidth onClick={submit}>
        Assign
      </Button>
    </Box>
  );
}

export default TaskForm;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';

function TaskForm({ members }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selected, setSelected] = useState(members[0]?.name);
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
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Assign Task</h3>
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mb-2 w-full p-2 border">
        {members.map((m) => (
          <option key={m.id} value={m.name}>{m.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full p-2 border"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mb-2 w-full p-2 border"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={submit}>Assign</button>
    </div>
  );
}

export default TaskForm;
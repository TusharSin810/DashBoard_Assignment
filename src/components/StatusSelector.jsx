import { useDispatch } from 'react-redux';
import { updateStatus } from '../redux/slices/membersSlice';

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

function StatusSelector({ member }) {
  const dispatch = useDispatch();
  if (!member) return null; 
  const handleStatusChange = (status) => {
    dispatch(updateStatus({ name: member.name, status }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Update Your Status</h3>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded border ${
              member.status === status ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusSelector;
import { useDispatch } from 'react-redux';
import { updateStatus } from '../redux/slices/membersSlice';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // optional icon

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

function StatusSelector({ member }) {
  const dispatch = useDispatch();
  if (!member) return null;

  const handleStatusChange = (status) => {
    dispatch(updateStatus({ name: member.name, status }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700 transition-all">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Update Your Status
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statuses.map((status) => {
          const isActive = member.status === status;
          return (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${isActive
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300 dark:ring-blue-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}
              `}
            >
              {isActive && <CheckCircleIcon className="w-4 h-4" />}
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StatusSelector;

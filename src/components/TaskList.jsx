import { useDispatch } from 'react-redux';
import { updateProgress } from '../redux/slices/membersSlice';

function TaskList({ tasks, memberName }) {
  const dispatch = useDispatch();

  const changeProgress = (taskId, current, delta) => {
    const newProgress = Math.max(0, Math.min(100, current + delta));
    dispatch(updateProgress({ memberName, taskId, progress: newProgress }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Your Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-sm">No tasks assigned.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-3 rounded">
              <h4 className="font-bold text-md">{task.title}</h4>
              <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              <div className="my-2 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => changeProgress(task.id, task.progress, -10)}
                >
                  -10%
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => changeProgress(task.id, task.progress, 10)}
                >
                  +10%
                </button>
                {task.progress === 100 && <span className="text-green-700 ml-2">✅ Completed</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
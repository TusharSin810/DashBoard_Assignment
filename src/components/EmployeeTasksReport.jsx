import { useSelector } from 'react-redux';

function EmployeeTasksReport() {
  const members = useSelector((state) => state.members);

  return (
    <div className="bg-white dark:bg-[#1f2937] text-black dark:text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Employee Tasks Report</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="text-left py-2 px-4">Employee</th>
            <th className="text-left py-2 px-4">Total Tasks</th>
            <th className="text-left py-2 px-4">Completed</th>
            <th className="text-left py-2 px-4">Pending</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const totalTasks = member.tasks.length;
            const completedTasks = member.tasks.filter((t) => t.completed).length;
            const pendingTasks = totalTasks - completedTasks;

            return (
              <tr key={member.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4">{member.name}</td>
                <td className="py-2 px-4">{totalTasks}</td>
                <td className="py-2 px-4 text-green-500">{completedTasks}</td>
                <td className="py-2 px-4 text-red-500">{pendingTasks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTasksReport;
import { toggleDarkMode } from "../utils/theme";

function Dashboard() {
  
    return (
    <div>
      <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      Toggle Theme
    </button>
    </div>
  )
}

export default Dashboard;
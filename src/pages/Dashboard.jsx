import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatusPieChart from '../components/StatusPieChart';
import Header from '../components/Header';
import { setMembers, updateStatus } from '../redux/slices/membersSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';
import ReportBarChart from '../components/ReportBarChart';
import CalendarSection from '../components/CalenderSection';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { BackgroundBeams } from '../components/ui/background-beams';
import MemberCard from '../components/MemberCard';

function Dashboard() {
  const role = useSelector(state => state.role.currentRole);
  const members = useSelector(state => state.members);
  const user = useSelector(state => state.role.currentUser);
  const dispatch = useDispatch();
  const INACTIVITY_LIMIT = 60 * 1000;
  let activityTimer;

  const [darkMode, setDarkMode] = useState(false);
  const dashboardRef = useRef(null);
  const teamRef = useRef(null);
  const tasksRef = useRef(null);
  const reportsRef = useRef(null);
  const calendarRef = useRef(null);

  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredAndSortedMembers = [...members]
    .filter(m => !filterStatus || m.status === filterStatus)
    .sort((a, b) => {
      const activeA = (a.tasks || []).filter(t => t.progress < 100).length;
      const activeB = (b.tasks || []).filter(t => t.progress < 100).length;
      if (sortOrder === 'asc') return activeA - activeB;
      if (sortOrder === 'desc') return activeB - activeA;
      return 0;
    });

  useEffect(() => {
    if (members.length === 0) {
      fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => dispatch(setMembers(data.results)));
    }
  }, [dispatch, members.length]);

  const currentMember = members.find(m => m.name === user);
  const allTasks = members.flatMap(m => m.tasks || []);
  const completed = allTasks.filter(t => t.progress === 100).length;
  const progress = allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;

  const statusSummary = {
    Working: 0,
    Break: 0,
    Meeting: 0,
    Offline: 0,
  };
  members.forEach(m => {
    if (m.status) statusSummary[m.status]++;
  });

  const scrollTo = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        if (role === 'member' && currentMember && currentMember.status !== 'Offline') {
          dispatch(updateStatus({ name: user, status: 'Offline' }));
        }
      }, INACTIVITY_LIMIT);
    };
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      clearTimeout(activityTimer);
    };
  }, [role, user, currentMember, dispatch]);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <BackgroundBeams />
      <div className="flex flex-col md:flex-row min-h-screen bg-indigo-100 dark:bg-gray-900 dark:text-white transition-all">
        <aside className="w-full md:w-64 bg-indigo-900 text-white p-6 dark:text-black dark:bg-indigo-200 flex flex-col justify-between shadow-lg">
          <div className='z-10'>
            <h2 className="text-3xl font-extrabold mb-8 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-600 dark:to-purple-900 drop-shadow-lg animate-fade-in">
              Pulse Dashboard
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 mb-6 bg-indigo-700 hover:bg-indigo-600 rounded-lg transition-colors duration-200 dark:bg-indigo-400"
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              <span className="text-sm font-medium cursor-pointer">Toggle Mode</span>
            </button>
            <ul className="space-y-3 text-sm font-medium">
              {role === 'lead' && (
                <>
                  <li onClick={() => scrollTo(dashboardRef)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-all">📊 Overview</li>
                  <li onClick={() => scrollTo(reportsRef)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-all">📈 Reports</li>
                </>
              )}
              <li onClick={() => scrollTo(teamRef)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-all">👥 Team</li>
              <li onClick={() => scrollTo(tasksRef)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-all">✅ Tasks</li>
              <li onClick={() => scrollTo(calendarRef)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-all">📅 Calendar</li>
            </ul>
          </div>
          <footer className="text-xs text-gray-300 pt-4 border-t border-indigo-700 dark:text-black">&copy; {new Date().getFullYear()} Tushar Singhal</footer>
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-10 z-10">
          <Header />

          {role === 'lead' && (
            <section ref={dashboardRef}>
              <h1 className="text-2xl font-bold mb-4">Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">Team Member Status</h3>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {Object.entries(statusSummary).map(([status, count]) => (
                      <span key={status} className={`px-4 py-1 rounded-full text-sm font-medium ${status === 'Working' ? 'bg-green-100 text-green-700' : status === 'Break' ? 'bg-yellow-100 text-yellow-700' : status === 'Meeting' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'} dark:bg-gray-700 dark:text-white`}>
                        {count} {status}
                      </span>
                    ))}
                  </div>
                  <div className="h-42 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400">
                    <StatusPieChart summary={statusSummary} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h4 className="text-sm text-gray-500 dark:text-gray-300">Members</h4>
                    <p className="text-2xl font-bold">{members.length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h4 className="text-sm text-gray-500 dark:text-gray-300">Tasks</h4>
                    <p className="text-2xl font-bold">{allTasks.length}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section ref={teamRef}>
            <h2 className="text-xl font-bold mb-4">Team Members</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-white dark:bg-gray-800 p-4 rounded shadow">
              {Object.entries(statusSummary).map(([label, count]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-medium">{label}:</span> {count}
                </div>
              ))}
            </div>
          </section>

          <section ref={tasksRef}>
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
              <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
              <div className="text-4xl font-bold text-center text-red-500">{progress}%</div>
            </div>

            {role === 'lead' && (
              <>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
                  <h3 className="text-lg font-semibold mb-4">Assign New Task</h3>
                  <TaskForm members={members} />
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div>
                    <label className="text-sm mr-2">Filter by Status:</label>
                    <select className="p-1 rounded border dark:bg-gray-700 cursor-pointer" onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="">All</option>
                      <option value="Working">Working</option>
                      <option value="Break">Break</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm mr-2">Sort by Active Tasks:</label>
                    <select className="p-1 rounded border dark:bg-gray-700 cursor-pointer" onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="none">None</option>
                      <option value="asc">Low → High</option>
                      <option value="desc">High → Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredAndSortedMembers.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
              </>
            )}

            {role === 'member' && currentMember && (
              <>
                <StatusSelector member={currentMember} />
                <TaskList tasks={currentMember?.tasks || []} memberName={user} />
              </>
            )}
          </section>

          {role === 'lead' && (
            <section ref={reportsRef}>
              <h2 className="text-xl font-bold mb-2">Reports</h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-400 text-center">
                <ReportBarChart />
              </div>
            </section>
          )}

          <section ref={calendarRef}>
            <h2 className="text-xl font-bold mb-2">Calendar</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-400 text-center">
              <CalendarSection selectedUser={currentMember} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

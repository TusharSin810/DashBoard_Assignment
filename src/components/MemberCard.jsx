import { motion } from 'framer-motion';

const MemberCard = ({ member }) => {
  const activeTasks = (member.tasks || []).filter(t => t.progress < 100);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h4>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        <span className="font-medium">Status:</span> {member.status}
      </p>
      <div className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <p>Total Tasks: <span className="font-medium">{member.tasks?.length || 0}</span></p>
        <p>Active Tasks: <span className="font-medium">{activeTasks.length}</span></p>
      </div>
    </motion.div>
  );
};

export default MemberCard;
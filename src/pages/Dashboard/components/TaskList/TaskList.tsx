interface Task {
    id: string;
    title: string;
    status: 'In Progress' | 'Completed' | 'Pending';
    dueDate: string;
  }
  
  const tasks: Task[] = [
    { id: '1', title: 'Design Landing Page', status: 'In Progress', dueDate: '2025-01-10' },
    { id: '2', title: 'Fix Login Issues', status: 'Pending', dueDate: '2025-01-08' },
    { id: '3', title: 'Database Backup', status: 'Completed', dueDate: '2025-01-05' },
  ];
  
  const TaskList: React.FC = () => {
    return (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center py-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                task.status === 'Completed'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : task.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;
  
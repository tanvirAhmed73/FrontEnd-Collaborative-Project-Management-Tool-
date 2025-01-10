import { Project } from '../../../../interfaces/project';
import { CalendarDays, CheckCircle, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}


const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
 
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl dark:bg-gray-800 transition-all duration-200 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
          }`}
        >
          {project.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {project.status === 'Completed' ? (
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
          ) : (
            <Clock className="w-4 h-4 mr-2 text-yellow-500" />
          )}
          <span>{project.status}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assigned to:</h4>
        <div className="flex -space-x-2 overflow-hidden">
          {
            project.assignedTo ? 
             <h1 className='text-lg text-green-600 font-bold'>{project.assignedTo}</h1> : <h1>Not Assigned</h1>
          } 
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;


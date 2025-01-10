
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, User, FileText, X } from 'lucide-react';

const ProjectCreationForm: React.FC<{
  onClose: () => void;
  onCreate: (project: { title: string; description: string; assignedTo: string | null; status: string; dueDate: Date }) => void;
}> = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState<string | null>(''); 
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState<string>('');
  const [users, setUsers] = useState<{ id: string; name: string; role: string; status: string }[]>([]);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backend-collaborative-project-management.onrender.com/user/allusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateProject = async () => {
    if (projectName.trim() && projectDescription.trim() && status.trim() && dueDate) {
      const newProject = {
        name: projectName,
        description: projectDescription,
        assignedTo: assignedTo || null,
        status: status,
        dueDate: new Date(dueDate),
      };

      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token is missing. Please log in again.');
        }
        const response = await axios.post('https://backend-collaborative-project-management.onrender.com/task', newProject,{
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        
        onCreate(response.data);
        onClose();
      } catch (error) {
        console.error('Error adding project:', error);
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 shadow-2xl"
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Task</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-6">
            {/* Project Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>
            </div>
            {/* Project Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                rows={4}
              ></textarea>
            </div>
            {/* Assigned To Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={assignedTo || ''}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}:({user.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Status Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                >
                  <option value="To Do">To Do</option>
                  <option value="Progress">In Progress</option>
                  <option value="complete">Completed</option>
                </select>
              </div>
            </div>
            {/* Due Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateProject}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            >
              Create Project
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCreationForm;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectCreationForm from '../ProjectCreationForm/ProjectCreationForm';
import { Project } from '../../../../interfaces/project';
import { X } from 'lucide-react';



const MainSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [users, setUsers] = useState<{ id: string; name: string; role: string; status: string }[]>([]);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/allusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


  // const {user} = useContext(AuthContext);
  const user = {
    role: 'admin'
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("projects"); // Fetch and set the project data
        const accessToken = localStorage.getItem('accessToken');
        console.log("accestoken",accessToken); // Fetch and set the project data
        const response = await axios.get('http://localhost:3000/task',{
          headers:{
            Authorization:`${accessToken}`
          }
        });
        console.log(response); // Fetch and set the project data
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleCreateProject = (newProject: Project) => {
    setProjects(prevProjects => [...prevProjects, newProject]); // Add the new project to the list
  };

  // Filter projects by status
  const filterProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status);
  };

  // Function to handle the click on a project card and open the popup
  const openPopup = (project: Project) => {
    setSelectedProject(project);
    setPopupVisible(true);
  };

  // Function to handle the change of status and assigned user
  const handleChange = async () => {
    if (selectedProject) {
      try {
        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');
    
        // Check if the accessToken exists
        if (!accessToken) {
          throw new Error('Access token is missing. Please log in again.');
        }
        console.log("selectedProject",selectedProject);
        const response = await axios.put(`http://localhost:3000/task/${selectedProject._id}`, selectedProject, {
          headers: {
            Authorization: `${accessToken}`, // Add the access token here
          },
        });
        // Update the project list after change
        setProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === selectedProject._id ? response.data : project
          )
        );
        setPopupVisible(false); // Close the popup
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  // Delete a project
  const handleDelete = async (projectId: string) => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
  
      // Check if the accessToken exists
      if (!accessToken) {
        throw new Error('Access token is missing. Please log in again.');
      }
  
      // Send the DELETE request with the Authorization header
      await axios.delete(`http://localhost:3000/task/${projectId}`, {
        headers: {
          Authorization: `${accessToken}`, // Add the access token here
        },
      });
      // Update the project list after deletion
      setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
      // Close the popup
      


    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      {/* Button to open the create form */}
      <button 
        onClick={() => setFormVisible(true)} 
        className="px-4 py-2 mb-5 bg-green-500 text-white rounded-lg"
      >
        Create New Task
      </button>

      {/* Project creation form */}
      {formVisible && (
        <ProjectCreationForm
          user = {user}
          onClose={() => setFormVisible(false)} 
          onCreate={handleCreateProject} 
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TODO Column */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
            To Do
          </h2>
          <div className="space-y-4">
            {filterProjectsByStatus('Todo').map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => openPopup(project)}
              />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
            In Progress
          </h2>
          <div className="space-y-4">
            {filterProjectsByStatus('Progress').map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => openPopup(project)}
              />
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            Completed
          </h2>
          <div className="space-y-4">
            {filterProjectsByStatus('complete').map(project => (
              <div key={project._id} className="bg-green-50 dark:bg-green-900 rounded-lg p-4 shadow-md transition-all duration-200 hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full dark:bg-green-700 dark:text-green-100">
                    Completed
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    <span className="font-medium">Due:</span> {new Date(project.dueDate).toLocaleDateString()}
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assigned to:</h4>
                    <div className="flex -space-x-2 overflow-hidden">
                      {project.assignedTo}
                    </div>
                  </div>
                </div>
                {(user.role === 'admin' || user.role === 'manager') && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



      </div>

      {/* Popup for project details */}
      {popupVisible && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-600">
            <h3 className="text-2xl font-bold text-white">Edit Project</h3>
            <button onClick={() => setPopupVisible(false)} className="text-white hover:text-gray-200 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedProject.name}
                onChange={(e) => setSelectedProject(prev => ({ ...prev!, title: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedProject.description}
                onChange={(e) => setSelectedProject(prev => ({ ...prev!, description: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedProject.status}
                onChange={(e) => setSelectedProject(prev => ({ ...prev!, status: e.target.value }))}
              >
                <option value="Todo">To Do</option>
                <option value="Progress">In Progress</option>
                <option value="complete">Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned To
              </label>
              <select
                  value={selectedProject.assignedTo || ''}
                  onChange={(e) => setSelectedProject(prev => ({ ...prev!, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user._id} value={user.id}>
                      Name:{user.name}, Role:({user.role} )
                    </option>
                  ))}
                </select>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={() => setPopupVisible(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleChange}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default MainSection;

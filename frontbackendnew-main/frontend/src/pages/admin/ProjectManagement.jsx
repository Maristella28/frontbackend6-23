import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('Planned');

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProject = () => {
    if (!newProjectName || !newOwner || !newDeadline) return;

    const newProject = {
      id: projects.length + 1,
      name: newProjectName,
      owner: newOwner,
      deadline: newDeadline,
      status: newStatus,
    };

    setProjects([...projects, newProject]);

    setNewProjectName('');
    setNewOwner('');
    setNewDeadline('');
    setNewStatus('Planned');
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Project Management</h1>
        <div className="shadow-lg border rounded-lg overflow-hidden mb-10">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Project Tracker</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showAddForm ? 'Cancel' : 'Add Project'}
            </button>
          </div>

          {showAddForm && (
            <div className="p-4 border-b bg-gray-50 space-y-4">
              <input
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Assigned Team / Owner"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border rounded px-4 py-2"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleAddProject}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Project
              </button>
            </div>
          )}

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-center">Project Name</th>
                <th className="px-4 py-3 text-center">Assigned Team / Owner</th>
                <th className="px-4 py-3 text-center">Deadline</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-blue-100">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-3 text-center font-medium">{project.name}</td>
                  <td className="px-4 py-3 text-center">{project.owner}</td>
                  <td className="px-4 py-3 text-center">{project.deadline}</td>
                  <td className="px-4 py-3 text-center">{project.status}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default ProjectManagement;
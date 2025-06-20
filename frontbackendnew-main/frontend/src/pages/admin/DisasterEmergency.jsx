import React, { useState } from 'react';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const DisasterEmergency = () => {
  const [disasterHotlines, setDisasterHotlines] = useState([
    {
      id: 1,
      type: 'Fire',
      hotline: '123-456-7890',
      procedure: [
        'Evacuate the building immediately.',
        'Call the fire department hotline.',
        'Do not use elevators.',
        'Assist elderly and children to evacuate safely.',
        'If trapped, stay low and cover your mouth with a cloth.',
      ],
    },
    {
      id: 2,
      type: 'Flood',
      hotline: '987-654-3210',
      procedure: [
        'Move to higher ground immediately.',
        'Do not walk or drive through floodwaters.',
        'Stay tuned to local news for updates.',
        'Turn off utilities if instructed.',
        'Avoid contact with contaminated water.',
      ],
    },
  ]);

  const [expandedDisaster, setExpandedDisaster] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newType, setNewType] = useState('');
  const [newHotline, setNewHotline] = useState('');
  const [newProcedure, setNewProcedure] = useState('');

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState('');
  const [editHotline, setEditHotline] = useState('');
  const [editProcedure, setEditProcedure] = useState('');

  const toggleProcedure = (id) => {
    setExpandedDisaster(expandedDisaster === id ? null : id);
  };

  const handleAddHotline = () => {
    if (!newType || !newHotline || !newProcedure) return;

    const newEntry = {
      id: disasterHotlines.length + 1,
      type: newType,
      hotline: newHotline,
      procedure: newProcedure.split('\n').map((step) => step.trim()).filter((step) => step !== ''),
    };

    setDisasterHotlines([...disasterHotlines, newEntry]);

    setNewType('');
    setNewHotline('');
    setNewProcedure('');
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updatedHotlines = disasterHotlines.filter((disaster) => disaster.id !== id);
    setDisasterHotlines(updatedHotlines);
  };

  const handleEdit = (disaster) => {
    setEditId(disaster.id);
    setEditType(disaster.type);
    setEditHotline(disaster.hotline);
    setEditProcedure(disaster.procedure.join('\n'));
  };

  const handleSaveEdit = (id) => {
    const updatedHotlines = disasterHotlines.map((disaster) =>
      disaster.id === id
        ? {
            ...disaster,
            type: editType,
            hotline: editHotline,
            procedure: editProcedure.split('\n').map((step) => step.trim()).filter((step) => step !== ''),
          }
        : disaster
    );

    setDisasterHotlines(updatedHotlines);
    setEditId(null); // Exit edit mode
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Disaster and Emergency</h1>
        <div className="shadow-lg border rounded-lg overflow-hidden mb-10">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">List of Disaster and Emergency Hotlines</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showAddForm ? 'Cancel' : 'Add Emergency Hotline'}
            </button>
          </div>

          {showAddForm && (
            <div className="p-4 border-b bg-gray-50 space-y-4">
              <input
                type="text"
                placeholder="Type of Service / Assistance"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Emergency Hotline"
                value={newHotline}
                onChange={(e) => setNewHotline(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
              <textarea
                placeholder="Step-by-Step Procedure (one step per line)"
                value={newProcedure}
                onChange={(e) => setNewProcedure(e.target.value)}
                className="w-full border rounded px-4 py-2 h-32"
              ></textarea>
              <button
                onClick={handleAddHotline}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Hotline
              </button>
            </div>
          )}

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-center">Type of Disaster</th>
                <th className="px-4 py-3 text-center">Emergency Hotline</th>
                <th className="px-4 py-3 text-center">Emergency Response Procedure</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {disasterHotlines.map((disaster) => (
                <tr key={disaster.id}>
                  <td className="px-4 py-3 text-center font-medium">
                    {editId === disaster.id ? (
                      <input
                        type="text"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      disaster.type
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {editId === disaster.id ? (
                      <input
                        type="text"
                        value={editHotline}
                        onChange={(e) => setEditHotline(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      disaster.hotline
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleProcedure(disaster.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      {expandedDisaster === disaster.id ? 'Hide ▲' : 'View ▼'}
                    </button>
                    {expandedDisaster === disaster.id && (
                      <ul className="list-decimal list-inside text-left mt-2 bg-white border rounded p-3 shadow">
                        {disaster.procedure.map((step, index) => (
                          <li key={index} className="mb-1">{step}</li>
                        ))}
                      </ul>
                    )}
                    {editId === disaster.id && (
                      <textarea
                        value={editProcedure}
                        onChange={(e) => setEditProcedure(e.target.value)}
                        className="w-full border rounded px-2 py-1 mt-2"
                        rows="5"
                      ></textarea>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    {editId === disaster.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(disaster.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(disaster)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(disaster.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
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

export default DisasterEmergency;
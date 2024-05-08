// AdminPanel.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  
  const [message, setMessage] = useState('');
  const [listt, setList] = useState([]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if(!name || !level || !description){
      setMessage('Please fill all the details!');
      return;
    }
    try {
      await axios.post('https://lecture-scheduler-sfft.onrender.com/add-course', { name, level, description });
      setMessage('Course added successfully!');
    } catch (error) {
      setMessage('Failed to add course');
    }
  };

  const handleList = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://lecture-scheduler-sfft.onrender.com/list-of-instructors');
      console.log(response.data.instructor);
      setList(response.data.instructor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Welcome Admin!</h2>
      <h3 className="text-lg font-semibold mb-2">Add Course</h3>
      <form className="mb-4">
        <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 mb-2" />
        <input type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 mb-2" />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 mb-2" />

        <button onClick={handleAddCourse} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Course</button>
      </form>
      {message && <p className="text-sm mb-4">{message}</p>}

      <button onClick={handleList} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4">List of Instructors</button>
      {listt.map((instructor) => (
        <div key={instructor._id} className="bg-gray-100 rounded mb-2">
          <p className="text-lg font-semibold">{instructor.name}</p>
          <p className="text-gray-700">{instructor.subject}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;

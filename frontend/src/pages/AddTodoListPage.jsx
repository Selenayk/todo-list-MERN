import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const AddTodoListPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      const listData = { title };
      if (description) {
        listData.description = description;
      }
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post('http://localhost:3000/api/todo/lists', listData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate('/todo/lists');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate('/todo/lists');
  };

  return (
    <div className="p-4 flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-10">
          <button onClick={handleBack} className="text-2xl mr-4">
            <IoMdArrowRoundBack />
          </button>
          <h1 className="text-2xl font-semibold">Add Todo List</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block mb-1 text-xl">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-xl">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-500 text-white px-5 py-3 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoListPage;

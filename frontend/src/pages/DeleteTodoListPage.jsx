import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { IoMdArrowRoundBack } from 'react-icons/io';

const DeleteTodoListPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteTodoList = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/todo/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      });

      navigate('/todo/lists');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/todo/lists');
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
        <button onClick={handleBack} className="absolute top-4 left-4 text-3xl">
          <IoMdArrowRoundBack />
        </button>
        <h1 className="text-2xl font-semibold mb-8 mt-10 text-center">
          Are you sure you want to delete? This action cannot be undone.
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex justify-between'>
            <button
              className="px-24 py-3 bg-red-600 text-white font-bold text-xl rounded-lg "
              onClick={handleDeleteTodoList}
            >
              Delete
            </button>
            <button
              className="p-3 bg-gray-300 text-gray-800 font-bold text-xl rounded-lg"
              onClick={handleBack}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteTodoListPage;

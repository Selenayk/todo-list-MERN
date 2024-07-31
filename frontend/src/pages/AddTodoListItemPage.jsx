import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GoDot, GoDotFill } from 'react-icons/go';

const AddTodoListItemPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodoListAndItems = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const todoListRes = await axios.get(
          `http://localhost:3000/api/todo/lists/${listId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setTodoList(todoListRes.data);

        const todoItemsRes = await axios.get(
          `http://localhost:3000/api/todo/lists/${listId}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setTodoItems(todoItemsRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodoListAndItems();
  }, [listId]);

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `http://localhost:3000/api/todo/lists/${listId}/items`,
        { title, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const res = await axios.get(
        `http://localhost:3000/api/todo/lists/${listId}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTodoItems(res.data);
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen bg-gray-200">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-stretch space-x-10 justify-start ">
          <button
            onClick={() => navigate(`/todo/lists`)}
            className="text-2xl mb-4"
          >
            <IoMdArrowRoundBack className="text-3xl" />
          </button>
          {todoList && (
            <div className="basis-3/4 bg-white shadow-lg rounded-lg p-6 ">
              <h1 className="text-2xl font-semibold mb-2">{todoList.title}</h1>
              <p className="text-gray-600 mb-2">{todoList.description}</p>

              <ul className="list-disc list-inside">
                {todoItems.map((item) => (
                  <li key={item._id} className="flex items-center">
                    {item.completed ? (
                      <GoDotFill className="text-3xl text-green-500" />
                    ) : (
                      <GoDot className="text-3xl text-gray-500" />
                    )}
                    <span>{item.title}</span> | <span>{item.dueDate}</span> -{' '}
                    <span>{item.completed ? 'Completed' : 'Pending'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="basis-1/4 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Add New Item</h1>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border-2 border-gray-300 rounded"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 mb-4 border-2 border-gray-300 rounded"
            />
            <button
              onClick={handleAddItem}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AddTodoListItemPage.propTypes = {
  token: PropTypes.string,
};

export default AddTodoListItemPage;

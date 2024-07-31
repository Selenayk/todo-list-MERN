import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { GoDot, GoDotFill } from 'react-icons/go';
import { BsPatchPlus } from 'react-icons/bs';
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoTrash } from 'react-icons/go';
import '../styles/custom-scrollbar.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0]
};

const TodoListModal = ({ todoList, todoItems, loadingItems, onClose }) => {
  const [items, setItems] = useState(todoItems);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    setItems(todoItems);
  }, [todoItems]);

  const toggleCompletion = async (itemId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const item = items.find((item) => item._id === itemId);
      const updatedCompletedStatus = item.completed === true ? false : true;

      // Update the item in the database
      await axios.patch(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items/${itemId}`,
        {
          completed: updatedCompletedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update the local state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId
            ? { ...item, completed: updatedCompletedStatus }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const itemData = { title };
      if (dueDate) {
        itemData.dueDate = dueDate;
      }
      await axios.post(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items`,
        itemData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const res = await axios.get(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setItems(res.data);
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodoListItem = async (itemId) => {
    try {
      const token = localStorage.getItem('accessToken');

      await axios.delete(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const res = await axios.get(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-700 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="my-1 font-bold text-2xl">{todoList.title}</h1>
        <div className="flex items-center">
          <IoInformationCircleOutline className="text-gray-600 text-xl mt-1 mr-2" />
          <p className="my-2 text-gray-700">{todoList.description}</p>
        </div>
        <div className="flex justify-items-start my-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" p-2 h-8 mb-4 w-4/5 mr-2 border-2 border-gray-300 rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className=" p-2 h-8 mb-4 w-1/4 border-2 mr-2 border-gray-300 rounded"
          />
          <button
            onClick={handleAddItem}
            className="text-2xl mb-4 text-green-500 hover:text-green-600"
          >
            <BsPatchPlus />
          </button>
        </div>
        <div className="mt-4 scrollable-container">
          {loadingItems ? (
            <p>Loading items...</p>
          ) : (
            <div>
              <h4 className="text-gray-600 text-sm absolute right-16 top-40">
                Due Date
              </h4>
              <ul className="list-disc list-inside">
                {items.map((item) => (
                  <li key={item._id} className="flex items-center">
                    <div className="flex items-center">
                      <button onClick={() => toggleCompletion(item._id)}>
                        {item.completed ? (
                          <GoDotFill className="text-3xl text-gray-400 cursor-pointer" />
                        ) : (
                          <GoDot className="text-3xl text-gray-500 hover:text-black" />
                        )}
                      </button>
                      <h1
                        className={`ml-2 ${
                          item.completed ? 'line-through text-gray-300' : ''
                        }`}
                      >
                        {item.title}
                      </h1>
                    </div>
                    <div
                      className={`ml-auto mr-2 ${
                        item.completed ? 'text-gray-300' : ''
                      }`}
                    >
                      <h1>{item.dueDate ? formatDate(item.dueDate) : ''}</h1>
                    </div>
                    <div>
                      <button
                        className="text-red-600 mr-3"
                        onClick={() => handleDeleteTodoListItem(item._id)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TodoListModal.propTypes = {
  todoList: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dueDate: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
  loadingItems: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TodoListModal;

import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { BsPatchPlus } from 'react-icons/bs';
import { LuDot } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoListModal = ({ todoList, todoItems, loadingItems, onClose }) => {
  const [items, setItems] = useState(todoItems);
  const navigate = useNavigate();

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
          <LuDot className="text-gray-700 text-2xl" />
          <p className="my-1 text-gray-700">{todoList.description}</p>
        </div>
        <div className="mt-4">
          <div className="flex items-center mb-8 ml-1">
            <button className="flex items-center text-green-500 text-3xl mr-2">
              <BsPatchPlus
                onClick={() => navigate(`/todo/lists/${todoList._id}/add-item`)}
              />
            </button>
            <span className="mr-2 text-l font-semibold text-green-500">
              Add Item
            </span>
          </div>
          {loadingItems ? (
            <p>Loading items...</p>
          ) : (
            <div>
              <h4 className="text-gray-600 text-sm absolute right-4 top-36">
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
                    <div className={`ml-auto ${
                          item.completed ? 'text-gray-300' : ''
                        }`}>
                      <h1>{item.dueDate}</h1>
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

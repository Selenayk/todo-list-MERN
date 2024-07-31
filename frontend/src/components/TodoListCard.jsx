import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoListModal from './TodoListModal';
import { GoTrash } from 'react-icons/go';
import { BsPatchPlus } from 'react-icons/bs';

const TodoListCard = ({ todoList }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = async () => {
    setShowModal(true);
    setLoadingItems(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(
        `http://localhost:3000/api/todo/lists/${todoList._id}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTodoItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <div className="border-2 border-gray-500 rounded-lg p-4 m-4 relative hover:shadow-2xl cursor-pointer">
      <GoTrash
        className="absolute top-4 right-4 text-red-600 text-2xl cursor-pointer"
        onClick={() => navigate(`/todo/lists/${todoList._id}/delete`)}
      />
      <BsPatchPlus
        className="absolute top-14 right-4 text-green-500 text-2xl cursor-pointer"
        onClick={() => navigate(`/todo/lists/${todoList._id}/add-item`)}
      />
      <h2 className="text-xl font-semibold">{todoList.title}</h2>
      <p className="text-gray-600">{todoList.description}</p>
      <button
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
        onClick={handleViewMore}
      >
        View More
      </button>
      {showModal && (
        <TodoListModal
          todoList={todoList}
          todoItems={todoItems}
          loadingItems={loadingItems}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

TodoListCard.propTypes = {
  todoList: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default TodoListCard;

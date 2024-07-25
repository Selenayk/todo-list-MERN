import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import TodoListModal from './TodoListModal';

const TodoListCard = ({ todoList }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

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
    <div className="border-2 border-gray-500 rounded-lg p-4 m-4 relative hover:shadow-xl">
      <h2 className="text-xl font-semibold">{todoList.title}</h2>
      <p className="text-gray-600">{todoList.description}</p>
      <button
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded"
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

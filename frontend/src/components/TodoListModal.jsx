import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';


const TodoListModal = ({ todoList, todoItems, loadingItems, onClose }) => {
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
        <h4 className="my-2 text-gray-500">{todoList._id}</h4>
        <h2 className="my-1 text-2xl">{todoList.title}</h2>
        <p className="my-1 text-gray-700">{todoList.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Items:</h3>
          {loadingItems ? (
            <p>Loading items...</p>
          ) : (
            <ul>
              {todoItems.map((item) => (
                <li key={item._id} className="my-1">
                  <span>{item.title}</span> - <span>{item.dueDate}</span> -{' '}
                  <span>{item.completed ? 'Completed' : 'Pending'}</span>
                </li>
              ))}
            </ul>
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

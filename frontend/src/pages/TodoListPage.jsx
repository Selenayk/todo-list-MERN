import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import TodoListCard from '../components/TodoListCard';
import { FiLogOut } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';

const TodoListPage = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(
          'http://localhost:3000/api/todo/lists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setTodoLists(response.data);
      } catch (error) {
        console.error('Error fetching todo lists:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No Token Found');
        }

        const res = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchTodoLists();
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/auth/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <LuUser className="text-5xl text-cyan-500 mr-3" />
          <div>
            <h1 className="text-3xl">{username}</h1>
            <p className="text-l text-gray-500 ">{email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-l">Log out</span>
          <button className="text-xl mr-4" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      </div>
      <div className="flex items-center mb-3 ml-5">
        <span className="mr-2 text-xl">Add Todo List</span>
        <Link to="/todo/lists/create">
          <button className='flex items-center'>
            <IoIosAddCircleOutline className="text-cyan-500 text-3xl " />
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {todoLists.map((todoList) => (
            <TodoListCard key={todoList._id} todoList={todoList} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoListPage;

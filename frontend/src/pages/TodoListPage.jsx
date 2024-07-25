// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';
// import { Link } from 'react-router-dom';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

// const TodoListsPage = () => {
//   const [todoLists, setTodoLists] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTodoLists = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await axios.get(
//           'http://localhost:3000/api/todo/lists',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true, // Ensure cookies are sent if using session-based auth
//           }
//         );

//         setTodoLists(response.data);
//       } catch (error) {
//         console.error('Error fetching todo lists:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTodoLists();
//   }, []);


//   return (
//     <div className='p-4'>
//       <div className='flex justify-between items-center'>
//         <h1 className='text-4xl my-8'>Todo Lists</h1>
//         <Link to='/todo/lists/create'>
//           <MdOutlineAddBox className='text-cyan-500 text-4xl'/>
//         </Link>
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <table className='w-full border-separate border-spacing-3'>
//           <thead>
//             <tr>
//               <th className='border border-slate-600 rounded-md'>No</th>
//               <th className='border border-slate-600 rounded-md'>Title</th>
//               <th className='border border-slate-600 rounded-md'>Description</th>
//               <th className='border border-slate-600 rounded-md '>Todo Items</th>
//               <th className='border border-slate-600 rounded-md'>Operations</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todoLists.map((todoList, index) => (
//               <tr key={todoList._id} className='h-8'>
//                 <td className='border border-slate-600 rounded-md text-center'>
//                   {index + 1}
//                 </td>
//                 <td className='border border-slate-600 rounded-md text-center'>
//                   {todoList.title}
//                 </td>
//                 <td className='border border-slate-600 rounded-md text-center'>
//                   {todoList.description}
//                 </td>
//                 <td className='border border-slate-600 rounded-md text-center'>
//                   {(todoList.todoItems || []).map((item) => (
//                     <li key={item._id}>
//                       {item.title} - {item.dueDate} - {' '}
//                       {item.completed ? 'Completed' : 'Pending'}
//                     </li>
//                   ))}
//                 </td>
//                 <td className="border border-slate-700 rounded-md text-center">
//                   <div className="flex justify-center gap-x-4">
//                     <Link to={`/todo/list/details/${todoList._id}`}>
//                       <BsInfoCircle className="text-2xl text-green-700" />
//                     </Link>
//                     <Link to={`/todo/list/edit/${todoList._id}`}>
//                       <AiOutlineEdit className="text-2xl text-amber-600" />
//                     </Link>
//                     <Link to={`/todo/list/delete/${todoList._id}`}>
//                       <MdOutlineDelete className="text-2xl text-red-700" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// };

// export default TodoListsPage;

import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import TodoListCard from '../components/TodoListCard';

const TodoListPage = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true); // Başlangıçta yükleniyor olarak ayarla

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
        setLoading(false); // Veri yüklendikten sonra yükleme durumunu kapat
      }
    };

    fetchTodoLists();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl my-8'>Todo List</h1>
        <Link to='/todo/lists/create'>
          <MdOutlineAddBox className='text-cyan-500 text-4xl'/>
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

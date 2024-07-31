import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LogInPage';
import TodoListsPage from './pages/TodoListPage';
import AddTodoListPage from './pages/AddTodoListPage';
import DeleteTodoListPage from './pages/DeleteTodoListPage';
import AddTodoListItemPage from './pages/AddTodoListItemPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/todo/lists" element={<TodoListsPage />} />
      <Route path="/todo/lists/create" element={<AddTodoListPage />} />
      <Route path="/todo/lists/:id/delete" element={<DeleteTodoListPage />} />
      <Route
        path="/todo/lists/:listId/add-item"
        element={<AddTodoListItemPage />}
      />
    </Routes>
  );
};

export default App;

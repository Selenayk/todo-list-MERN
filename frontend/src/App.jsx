import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LogInPage';
import TodoListsPage from './pages/TodoListPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path='/auth/login' element={<LoginPage />}/>
      <Route path="/todo/lists" element={<TodoListsPage/>}/>
    </Routes>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;

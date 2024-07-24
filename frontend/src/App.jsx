import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Routes>
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;

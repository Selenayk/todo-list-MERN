import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/auth/register" Component={RegisterPage} />
      </Routes>
    </Router>
  );
};

export default App;

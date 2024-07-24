import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Welcome to Todo App
      </h1>
      <div className="bg-white p-8 mb-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col gap-4">
          <h1 className='text-xl font-semibold text-center'>Create An Account</h1>
          <Link to="/auth/register">
            <button className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col gap-4">
          <h1 className='text-xl font-semibold text-center'>Log In To Your Account</h1>
          <Link to="/auth/login">
            <button className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

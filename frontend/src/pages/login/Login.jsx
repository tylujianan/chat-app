import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isloading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="p-2 text-gray-400"><span>Username</span></div>
            <Input placeholder="Enter username" className='w-full p-3 h-10'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="p-2 text-gray-400"><span className="text-base">Password</span></div>
            <Input type="password" placeholder="Enter password" className='w-full p-3 h-10'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to='/signup'
            className="text-sm text-slate-400 hover:underline hover:text-blue-600 mt-3 inline-block"
          >
            {"Dont't"} have an account ?
          </Link>

          <div className='my-2'>
            <button className="w-full h-10 rounded-lg bg-slate-900 text-sm text-slate-300 p-2" disabled={isloading}>
              {isloading ? <span className="loading loading-spinner loading-lg"></span> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

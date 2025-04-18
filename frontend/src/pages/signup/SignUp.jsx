import GenderCheckbox from "./GenderCheckbox";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { isLoading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }

  const handleSumit = async (e) => {
    e.preventDefault();
    await signup(inputs)
  }

  return (
    <div className="flec flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSumit}>
          <div>
            <div className="p-2 text-gray-400"><span className="text-base">Full Name</span></div>
            <Input placeholder="Jianan Lu" className='w-full p-3 h-10'
              value={inputs.fullname}
              onChange={e => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>
          <div>
            <div className="p-2 text-gray-400"><span className="text-base">Username</span></div>
            <Input placeholder="Lujianan" className='w-full p-3 h-10'
              value={inputs.username}
              onChange={e => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div>
            <div className="p-2 text-gray-400"><span className="text-base">Password</span></div>
            <Input type="password" placeholder="Enter password" className='w-full p-3 h-10'
              value={inputs.password}
              onChange={e => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div>
            <div className="p-2 text-gray-400"><span className="text-base">Confirm Password</span></div>
            <Input type="password" placeholder="Confirm Password" className='w-full p-3 h-10'
              value={inputs.confirmPassword}
              onChange={e => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link
            to="/login"
            className="text-sm text-slate-400 hover:underline hover:text-blue-600 inline-block"
          >
            Already have an account ?
          </Link>
          <div className="mt-2">
            <button className="w-full h-10 rounded-lg bg-slate-900 text-sm text-slate-300 p-2" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

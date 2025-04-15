import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flec flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <soan className="text-blue-500">ChatApp</soan>
        </h1>

        <form action="">
          <div>
            <label className="label p-2">
              <span className="text-base">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Jianan Lu"
              className="w-full input input-neutral p-2 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base">Username</span>
            </label>
            <input
              type="text"
              placeholder="Lujianan"
              className="w-full input input-neutral p-2 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-neutral p-2 h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-neutral p-2 mb-2 h-10"
            />
          </div>

          <GenderCheckbox />

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account ?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import imgHolder from "../../assets/icons/image-placeholder.jpg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BiUserPlus } from "react-icons/bi";
import testUsers from "../../assets/json/testUsers.json";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser } = useAuth();
  const [isShowPass, setIsShowPass] = useState(false);
  const [image, setImage] = useState("");
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = handleSubmit(({ email, password, image, name }) => {
    if (!/[A-Z]/.test(password)) {
      toast.error("Must have an Uppercase letter in the password");
    } else if (!/[a-z]/.test(password)) {
      toast.error("Must have a Lowercase letter in the password");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Must have a special character in the password");
    } else {
      createUser({ email, password, image, name }, () => {
        toast.success("Account created successfully");
        navigate(location?.state ?? "/");
      });
    }
  });
  return (
    <div className="m-4 p-6 lg:mx-0 rounded-lg border bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-8 lg:text-5xl lg:mb-12 font-semibold text-center mb-6">
        Please Register
      </h2>
      <datalist id="test-users">
        {testUsers.map((user, index) => (
          <option key={index} value={user} />
        ))}
      </datalist>
      <img
        src={image ? image : imgHolder}
        className="w-[150px] aspect-square object-center rounded-full bg-gray-50 ring-4 mx-auto mb-6 dark:ring-gray-400"
      />
      <form className="grid w-fit mx-auto gap-4" onSubmit={handleFormSubmit}>
        <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Enter your name"
            required
            {...register("name")}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 p-2 pr-2">
          <img
            src={image ? image : imgHolder}
            className="w-[2em] aspect-square object-center rounded-full bg-gray-50 ring-2"
          />
          <div className="overflow-hidden flex grow ml-1">
            <input
              type="url"
              list="test-users"
              className="grow -mr-4"
              placeholder="Enter your image url"
              required
              {...register("image", {
                onChange: (e) => {
                  setImage(e.target.value);
                },
              })}
            />
          </div>
        </label>
        <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Enter your email"
            required
            {...register("email")}
          />
        </label>
        <div className="join">
          <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 join-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isShowPass ? "text" : "password"}
              className="grow"
              placeholder="Enter your password"
              required
              minLength="6"
              maxLength="20"
              {...register("password")}
            />
          </label>
          <button
            className="btn join-item text-2xl px-2 border border-gray-300 dark:bg-gray-400 dark:border-gray-400 dark:text-white"
            onClick={(e) => {
              e.preventDefault();
              setIsShowPass(!isShowPass);
            }}
          >
            {isShowPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="btn w-full btn-primary dark:bg-blue-800 dark:border-gray-400"
          >
            Register <BiUserPlus />
          </button>
        </div>
      </form>
      <p className="w-fit mx-auto">
        Already have an account?{" "}
        <Link
          className="btn btn-link p-0 dark:text-blue-300"
          to="/login"
          state={location?.state}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;

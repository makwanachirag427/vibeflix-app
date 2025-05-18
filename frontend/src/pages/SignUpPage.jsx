import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const { searchParams } = new URL(window.location);
  const emailValue = searchParams.get("email");
  const [formData, setFormData] = useState({
    email: emailValue || "",
    username: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    setFormData({
      email: "",
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.2)),url('/hero.png')]  text-white pb-20">
      <header className="max-w-6xl mx-auto p-6">
        <Link to={"/"}>
          <img src="/vibeflix-logo.png" className="w-25 lg:w-40" />
        </Link>
      </header>
      <div className="max-w-md mx-auto rounded bg-black/80 sm:py-25 p-15">
        <form
          className="flex flex-col justify-center"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-3xl font-bold">Sign Up</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mt-8 border bg-transparent border-gray-400 rounded p-3.5 placeholder:text-gray-400 placeholder:font-semibold"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="mt-6 border bg-transparent border-gray-400 rounded p-3.5 placeholder:text-gray-400 placeholder:font-semibold"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-6 border bg-transparent border-gray-400 rounded w-full p-3.5 placeholder:text-gray-400 placeholder:font-semibold"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="mt-6 bg-red-600 p-2 font-semibold rounded">
            {isSigningUp ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-10 text-gray-300">
          Already member?{" "}
          <Link
            to={"/login"}
            className="hover:underline font-semibold text-white"
          >
            Sign in now.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;

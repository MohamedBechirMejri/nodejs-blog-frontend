import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      toast.error("Already Logged In!");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://evening-refuge-13847.herokuapp.com/login", {
        email,
        password,
      })
      .then(response => {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uid", JSON.stringify(response.data.uid));
        navigate("/");
      })
      .catch(error => {
        toast.error(error.response.data.msg);
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 animate-revealPage max-w-[800px] m-auto"
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium text-center">
        Hello Again! <br />
        <span className="text-lg font-light">
          Welcome Back, You've Been Missed!
        </span>
      </h1>
      <input
        type="email"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Enter Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        minLength={8}
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
        Sign In
      </button>
      <p className="text-sm font-semibold text-center text-gray-600">
        Not a member?{" "}
        <Link
          to="/signup"
          className="text-[#4792F0] hover:underline transition-all"
        >
          Register now
        </Link>
      </p>
    </form>
  );
};

export default Login;

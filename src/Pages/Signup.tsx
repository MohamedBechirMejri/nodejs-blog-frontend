import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

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
      .post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      })
      .then(response => {
        toast.success(response.data);
        navigate("/login");
      })
      .catch(error => {
        error.response.data.forEach((err: { msg: string }) => {
          toast.error(err.msg, {
            // position: "top-right",
            // autoClose: 5000,
            // hideProgressBar: false,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
            // theme: "colored",
          });
        });
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 p-8 animate-revealPage max-w-[800px] m-auto"
      onSubmit={handleSubmit}
      autoComplete="on"
    >
      <h1 className="text-3xl font-medium text-center">
        Welcome! <br />
        <span className="text-lg font-light">Glad to have you with us!</span>
      </h1>
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="First Name"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        autoComplete="first-name"
      />
      <input
        type="text"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Last Name"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        autoComplete="last-name"
      />
      <input
        type="email"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <input
        type="password"
        className="w-full p-5 transition-all rounded-lg border-white focus:border-[#F26865] focus:ring-[#F26865] outline-none placeholder:font-medium"
        placeholder="Password Confirmation"
        required
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
        autoComplete="new-password"
      />
      <button className="w-full p-5 rounded-lg bg-[#F26865] text-white text-xl font-medium shadow-sm shadow-[#F26865] active:bg-[#ca4747] transition-all">
        Sign Up
      </button>
      <p className="text-sm font-semibold text-center text-gray-600">
        Already a member?{" "}
        <Link
          to="/login"
          className="text-[#4792F0] hover:underline transition-all"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;

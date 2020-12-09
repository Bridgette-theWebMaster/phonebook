import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import background from "../../assets/yagasuri.jpg";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const url = `https://sleepy-bastion-45973.herokuapp.com/auth`;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      //console.log(parseRes)
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);

        setAuth(true);
        toast.success("Login Successful");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="Main-container">
      <div className="Login-container">
        <h1>Login</h1>
        <form onSubmit={onSubmitForm} className="Login">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Password"
          />
          <br />
          <button className="button success">Login</button>
        </form>
        <br />
        <Link to="/register" className="link">
          Don't have an account? Register.
        </Link>
      </div>
      <div className="Login-image">
        <img src={background} alt="yagasuri" />
      </div>
    </div>
  );
};

export default Login;

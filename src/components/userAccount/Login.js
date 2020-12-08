import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const url = `https://sleepy-bastion-45973.herokuapp.com/auth`
  

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch( url + "/login", {
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
        alert("Login Successful");
      } else {
        alert(parseRes)
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
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
  );
};

export default Login;

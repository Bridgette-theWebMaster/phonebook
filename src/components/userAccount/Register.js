import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import background from "../../assets/yagasuri.jpg";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    matchPassword: "",
    name: "",
    phone: "",
    adress: "",
    city: "",
    state: "",
  });

  const {
    email,
    password,
    matchPassword,
    name,
    phone,
    address,
    city,
    state,
  } = inputs;
  const url = `https://sleepy-bastion-45973.herokuapp.com/auth`;
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== matchPassword) {
      toast.dark("Passwords Do Not Match");
    } else {
      try {
        const body = { email, password, name, phone, address, city, state };
        const response = await fetch(url + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes.jwtToken) {
          localStorage.setItem("token", parseRes.jwtToken);

          setAuth(true);
          toast.dark("Registration Successful");
        } else {
          setAuth(false);
          console.log(parseRes);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="Main-container">
      <div className="Register-container">
        <h1>Register</h1>
        <form onSubmit={onSubmitForm} className="Register">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="password"
            name="matchPassword"
            value={matchPassword}
            placeholder="Re-enter Password"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="phone"
            name="phone"
            value={phone}
            placeholder="Phone"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="address"
            name="address"
            value={address}
            placeholder="Street Address"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="city"
            name="city"
            value={city}
            placeholder="City"
            onChange={(e) => onChange(e)}
          />
          <br />
          <input
            type="state"
            name="state"
            value={state}
            placeholder="State"
            onChange={(e) => onChange(e)}
          />
          <br />
          <br />
          <button className="button success">Register</button>
        </form>
        <br />
        <Link to="/login" className="link">
          Already have an account? Login.
        </Link>
      </div>
      <div className="Register-image">
        <img src={background} alt="yagasuri" />
      </div>
    </div>
  );
};

export default Register;

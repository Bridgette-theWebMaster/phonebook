import React, { useEffect, useState } from "react";
import BackButton from "../../buttons/BackButton";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditUser(props) {
  //console.log(props)
  const id = props.match.params.id;
  const [user, setUser] = useState([]);
  const url = `https://sleepy-bastion-45973.herokuapp.com/api/user/`;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (e) => {
    try {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("jwtToken", localStorage.token);

      const res = await fetch(url + id, {
        method: "GET",
        headers: headers,
      });
      const users = await res.json();
      setUser(users, "users");
    } catch (err) {
      alert(err.message);
    }
  };

  const { name, email, phone, address, city, state, note } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("jwtToken", localStorage.token);
      const body = { name, email, phone, address, city, state, note };
      const response = await fetch(url + id, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      //console.log(parseRes)
      toast.dark("Account updated");
    } catch (err) {
      console.log(err.message);
    }
  };
  const history = useHistory();

  return (
    <div className="UserForm">
      <h1>Update {user.name}'s Account</h1>
      <form onSubmit={onSubmitForm} className="AddContact">
        <input
          type="name"
          name="name"
          value={user.name}
          onChange={(e) => onChange(e)}
          placeholder="Name"
        />
        <br />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => onChange(e)}
          placeholder="Email"
        />
        <br />
        <input
          type="phone"
          name="phone"
          value={user.phone}
          onChange={(e) => onChange(e)}
          placeholder="Phone"
        />
        <br />
        <input
          type="address"
          name="address"
          value={user.address}
          onChange={(e) => onChange(e)}
          placeholder="Street Address"
        />
        <br />
        <input
          type="city"
          name="city"
          value={user.city}
          onChange={(e) => onChange(e)}
          placeholder="City"
        />
        <br />
        <input
          type="state"
          name="state"
          value={user.state}
          onChange={(e) => onChange(e)}
          placeholder="State"
        />
        <br />
        <br />
        <button
          type="submit"
          className="button"
          onClick={() => history.goBack()}
        >
          Update Account
        </button>
      </form>
      <br />
      <BackButton />
      <br />
    </div>
  );
}

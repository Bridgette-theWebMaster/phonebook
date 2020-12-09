import React, { useEffect, useState } from "react";
import stock from "../../assets/noun_Happy_50025.png";
import { Link } from "react-router-dom";
import BackButton from "../../buttons/BackButton";

export default function UserAccount(props) {
  const [user, setUser] = useState([]);
  const url = `https://sleepy-bastion-45973.herokuapp.com/api/user/`;
  const id = user.id;
  //console.log(user)
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
      console.log(err.message);
    }
  };

  return (
    <div className="User">
      <img
        src={
          user.picture === "null" || user.picture === "" ? stock : user.picture
        }
        alt={user.name}
        className="Photo"
      />
      <br />
      <Link to={`/user/${user.id}/edit/photo_upload`}>
        <button>Edit Photo</button>
      </Link>
      <br />
      <h2>{user.name}</h2>
      <p>User Id: {user.id}</p>
      {user.phone === null ? <p></p> : <p>Phone: {user.phone}</p>}
      {user.email === null ? <p></p> : <p>Email: {user.email}</p>}
      {user.address !== null || user.city !== null || user.state !== null ? (
        <p>
          Address: {user.address} {user.city}, {user.state}
        </p>
      ) : (
        <p></p>
      )}
      <Link to={`user/${user.id}/edit`}>
        <button>Edit Account</button>
      </Link>
      <br />
      <BackButton />
      <br />
    </div>
  );
}

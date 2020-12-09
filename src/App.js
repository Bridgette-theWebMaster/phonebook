import React, { useState, useEffect } from "react";
import "./App.css";
import AddContact from "./components/phonebook/AddContact";
import Contact from "./components/phonebook/Contact";
import ContactList from "./components/phonebook/ContactList";
import EditContact from "./components/phonebook/EditContact";
import ContactPhotoUploader from "./components/phonebook/ContactPhotoUploader";
import Login from "./components/userAccount/Login";
import Register from "./components/userAccount/Register";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import UserAccount from "./components/userAccount/UserAccount";
import EditUser from "./components/userAccount/EditUser";
import SearchBar from "./components/phonebook/SearchBar";
import PhotoUploader from "./components/userAccount/PhotoUploader";
import help from "./assets/help.png";
import ToggleContent from "./components/phonebook/modal/ToggleContent";
import Modal from "./components/phonebook/modal/Modal";

toast.configure();

function App() {
  //auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //component that controls ability to view private routes
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // connecting to API to set jwtToken and setIsAuthenticated
  const checkAuth = async () => {
    const url = "https://sleepy-bastion-45973.herokuapp.com/auth/verify";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { jwtToken: localStorage.token },
      });

      const parseRes = await response.json();
      //console.log(parseRes)
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  // removes token from storage forces user out of private routes
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.dark("logout successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ToggleContent
        toggle={(show) => (
          <button className="helpbtn" onClick={show}>
            <img src={help} alt="help" className="help" />
          </button>
        )}
        content={(hide) => (
          <Modal>
            <div className="instruction">
              <strong>Moshi Moshi is a modern contact book.</strong>
              <br />
              <p>Create an account or use the demo</p>
              <p>Email: test@test.com</p>
              <p>Password: password</p>
              <br />
              <p>
                Grow your contact list. Search and add existing users to your
                contact or create your own contacts.
              </p>
              <p>
                Try searching for our demo account with id:
                a70bc059-dc15-4fe2-b5cd-28527abdc63b
              </p>
              <p>
                Set notes, send emails to and, schedule reminders with your
                saved contacts
              </p>
            </div>

            <button onClick={hide}>Close</button>
          </Modal>
        )}
      />
      <div className={!isAuthenticated ? "App" : "Auth-App"}>
        <header className="App-header">
          <Link to={`/`}>MOSHI MOSHI</Link>
          <br />
          {!isAuthenticated ? null : (
            <button className="logout" onClick={(e) => logout(e)}>
              Logout
            </button>
          )}
          {!isAuthenticated ? <p></p> : <SearchBar />}
        </header>
        <main>
          <Switch>
            {["/", "/login"].map((path, i) => (
              <Route
                exact
                path={path}
                render={(props) =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/contact" />
                  )
                }
                key={i}
              />
            ))}
            <Route
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/user"
              render={(props) =>
                isAuthenticated ? (
                  <UserAccount {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/user/:id/edit"
              render={(props) =>
                isAuthenticated ? (
                  <EditUser {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/user/:id/edit/photo_upload"
              render={(props) =>
                isAuthenticated ? (
                  <PhotoUploader {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/contact"
              render={(props) =>
                isAuthenticated ? (
                  <ContactList {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/contact/add"
              render={(props) =>
                isAuthenticated ? (
                  <AddContact {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/contact/:id"
              render={(props) =>
                isAuthenticated ? (
                  <Contact {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/contact/:id/edit"
              render={(props) =>
                isAuthenticated ? (
                  <EditContact {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/contact/:id/edit/photo"
              render={(props) =>
                isAuthenticated ? (
                  <ContactPhotoUploader {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </main>
        <footer>
          <p>
            bridgette<strong>TURNER</strong> 2020
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;

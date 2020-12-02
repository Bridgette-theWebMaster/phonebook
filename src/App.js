import React, {useState, useEffect} from 'react'
import "./App.css";
import AddContact from "./components/phonebook/AddContact";
import Contact from "./components/phonebook/Contact";
import ContactList from "./components/phonebook/ContactList";
import EditContact from "./components/phonebook/EditContact";
import Login from './components/userAccount/Login'
import Register from './components/userAccount/Register'
import { Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import UserAccount from './components/userAccount/UserAccount';
import EditUser from './components/userAccount/EditUser';

toast.configure()
function App () {
  //auth
  const [isAuthenticated, setIsAuthenticate] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticate(boolean);
  };
  const checkAuth = async () => {
    const url = "http://localhost:8000/auth/verify";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { jwtToken: localStorage.token },
      });

      const parseRes = await response.json();
      //console.log(parseRes)
      parseRes === true ? setIsAuthenticate(true) : setIsAuthenticate(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  //getting contacts
  /*const [contacts, setContacts] = useState([]);
  const url = `http://localhost:8000/api/contacts/`;

  useEffect(() => {
    getContacts();
  }, []);  

  const getContacts = async (e) => {
    try {
      const headers = new Headers()

      headers.append("Content-Type", "application/json")
      headers.append("jwtToken", localStorage.token)

      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      })
      const contacts = await res.json();
      setContacts(contacts, "contacts");
    } catch (err) {
      console.log(err.message);
    }
  };*/
  //console.log(contacts);
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App App-header">
      {!isAuthenticated ? <p></p> : <button onClick={e =>logout(e)}>
        logout
      </button>}
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
              )}
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
            path="/contact/:id/edit"
            render={(props) =>
              isAuthenticated ? (
                <EditContact {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          
      </Switch>
    </div>
  );
}

export default App;
/*Moving all or most states within app is advantageous. if getContact
is moved into app, getContact can be passed to ContactList where Contact
is routed too. Then onClick specific contact, input that id into getContact
Contact state would need to be passed so that db info has a client home. */
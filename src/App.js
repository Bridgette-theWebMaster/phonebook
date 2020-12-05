import React, {useState, useEffect} from 'react'
import "./App.css";
import AddContact from "./components/phonebook/AddContact";
import Contact from "./components/phonebook/Contact";
import ContactList from "./components/phonebook/ContactList";
import EditContact from "./components/phonebook/EditContact";
import ContactPhotoUploader from "./components/phonebook/ContactPhotoUploader";
import Login from './components/userAccount/Login'
import Register from './components/userAccount/Register'
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserAccount from './components/userAccount/UserAccount';
import EditUser from './components/userAccount/EditUser';
import SearchBar from './components/phonebook/SearchBar';
import PhotoUploader from './components/userAccount/PhotoUploader';

toast.configure()
function App () {
  //auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //component that controls ability to view private routes
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // connecting to API to set jwtToken and setIsAuthenticated
  const checkAuth = async () => {
    const url = "http://localhost:8000/auth/verify";

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
      <Link to={`/`}>
        <header>
          MOSHI MOSHI
        </header>
      </Link>
      <br/>
      {!isAuthenticated ? <p></p> : <button onClick={e =>logout(e)}>
        Logout
      </button>}
      {!isAuthenticated ? <p></p> : <SearchBar />}
      <br/>
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
            path="/user/:id/edit/photo_upload"
            render={(props) =>
              isAuthenticated ? (
              <PhotoUploader {...props} setAuth={setAuth} /> 
              ) : (
                <Redirect to="/login" />
              )}
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
    </div>
  );
}

export default App;
/*Moving all or most states within app is advantageous. if getContact
is moved into app, getContact can be passed to ContactList where Contact
is routed too. Then onClick specific contact, input that id into getContact
Contact state would need to be passed so that db info has a client home. */
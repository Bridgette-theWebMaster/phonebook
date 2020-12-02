import React, {useState, useEffect} from 'react'
import "./App.css";
import AddContact from "./components/phonebook/AddContact";
import Contact from "./components/phonebook/Contact";
import ContactList from "./components/phonebook/ContactList";
import EditContact from "./components/phonebook/EditContact";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure()
function App () {
  const [contacts, setContacts] = useState([]);
  const url = `http://localhost:8000/api/contacts/`;

  useEffect(() => {
    getContacts();
  }, []);  

  const getContacts = async (e) => {
    try {
      const res = await fetch(url);
      const contacts = await res.json();
      setContacts(contacts, "contacts");
    } catch (err) {
      console.log(err.message);
    }
  };
  //console.log(contacts);


  return (
    <div className="App App-header">
      <Switch>
        <Route exact path="/" component={() => <ContactList contacts={contacts}/>} />
        <Route path="/contact/add" component={AddContact} />
        <Route exact path="/contact/:id" render={(props) => <Contact {...props}/>} />
        <Route path="/contact/:id/edit" render={(props) => <EditContact {...props} />} />
        
      </Switch>
    </div>
  );
}

export default App;
/*Moving all or most states within app is advantageous. if getContact
is moved into app, getContact can be passed to ContactList where Contact
is routed too. Then onClick specific contact, input that id into getContact
Contact state would need to be passed so that db info has a client home. */
import "./App.css";
import AddContact from "./components/AddContact";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import { Route, Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App App-header">
      <Router>
        <Route exact path="/" component={ContactList} />
        <Route exact path="/contact/:id" component={Contact} />
        <Route path="/contact/:id/edit" component={EditContact} />
        <Route path="/contact/add" component={AddContact} />
      </Router>
    </div>
  );
}

export default App;

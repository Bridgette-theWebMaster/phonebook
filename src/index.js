import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContactList from './components/ContantList';
import AddContact from './components/AddContact';

ReactDOM.render(
  <React.StrictMode>
    <ContactList />
  </React.StrictMode>,
  document.getElementById('root')
);
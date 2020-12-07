import React from "react";
import ReactDOM from "react-dom";
import ContactList from "./ContactList";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <ContactList />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

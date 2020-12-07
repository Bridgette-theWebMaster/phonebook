import React from "react";
import ReactDOM from "react-dom";
import EditContact from "./EditContact";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <EditContact />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

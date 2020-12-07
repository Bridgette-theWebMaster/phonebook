import React from "react";
import ReactDOM from "react-dom";
import AddContact from "./AddContact";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <AddContact />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

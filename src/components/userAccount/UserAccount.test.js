import React from "react";
import ReactDOM from "react-dom";
import UserAccount from "./UserAccount";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <UserAccount />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

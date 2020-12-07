import React from "react";
import ReactDOM from "react-dom";
import EditUser from "./EditUser";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <EditUser />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

import React from "react";
import ReactDOM from "react-dom";
import EditButton from "./EditButton";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <EditButton />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

import React from "react";
import ReactDOM from "react-dom";
import Contact from "./Contact";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

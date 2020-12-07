import React from "react";
import ReactDOM from "react-dom";
import BackButton from "./BackButton";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <BackButton />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

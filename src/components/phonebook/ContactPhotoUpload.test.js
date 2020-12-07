import React from "react";
import ReactDOM from "react-dom";
import ContactPhotoUploader from "./ContactPhotoUploader";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <ContactPhotoUploader />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

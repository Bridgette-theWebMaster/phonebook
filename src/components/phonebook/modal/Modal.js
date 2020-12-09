import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ children }) =>
  createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root")
  );
export default Modal;

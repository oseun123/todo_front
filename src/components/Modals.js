import React from "react";
import { ModalWrapper } from "./Styles";

const Modals = (props) => {
  const closeTodoModal = (e) => {
    e.preventDefault();
    props.closeModal();
  };
  const handleClick = (e) => {
    e.preventDefault();
    props.handle_submit();
  };

  return (
    <ModalWrapper>
      <form>
        <h4 className="text-center">{props.modal_title}</h4>
        <div className="form-group">{props.children}</div>
        <button
          className="btn btn-primary btn-sm float-right"
          onClick={handleClick}
        >
          Submit
        </button>
        <button
          className="btn btn-default btn-sm float-right mr-1"
          onClick={closeTodoModal}
        >
          Cancel
        </button>
      </form>
    </ModalWrapper>
  );
};

export default Modals;

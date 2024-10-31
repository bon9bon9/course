import React from 'react';
import {Modal} from 'react-bootstrap';

type Todo = {
  id : number;
  text : string;
  isChecked : boolean;
};

type TodoModalProps = {
  show : boolean;
  todo : Todo | null;
  handleClose : () => void;
}

export const TodoModal : React.FC<TodoModalProps> = ({show, todo, handleClose}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo 상세정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>{todo?.text}</Modal.Body>
      </Modal>
    </div>
  )
}
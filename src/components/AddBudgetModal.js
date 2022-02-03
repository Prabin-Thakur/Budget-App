import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

const AddBudgetModal = ({ show, handleClose}) => {
    const nameRef = useRef();
    const amountRef = useRef();
    const { addBudget } = useBudgets();

    function submitForm(event){
        event.preventDefault()
        addBudget({
            name: nameRef.current.value,
            maxAmount: amountRef.current.value
        })
        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose} >
          <Form onSubmit={submitForm}>
              <Modal.Header closeButton>
                  <Modal.Title>New Budget</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control ref={nameRef} type="text" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="max">
                      <Form.Label>Maximum Spending</Form.Label>
                      <Form.Control ref={amountRef} type="number" required min={0} step={0.01} max={100000000} />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">Add</Button>
                  </div>
              </Modal.Body>
          </Form>
      </Modal>
    );
};

export default AddBudgetModal;
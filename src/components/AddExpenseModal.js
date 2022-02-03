import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";

const AddExpenseModal = ({ show, handleClose, budgetId }) => {
    const { budgets } = useBudgets();
    const amountRef = useRef();
    const descriptionRef = useRef();
    const budgetRef = useRef();
    const { addExpense } = useBudgets();

    function formSubmit(event){
        event.preventDefault();
        addExpense({
            budgetId: budgetRef.current.value,
            amount: amountRef.current.value,
            description: descriptionRef.current.value
        })
        handleClose();
    }

    return(
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={formSubmit}>
              <Modal.Header closeButton>
                  <Modal.Title>New Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control ref={descriptionRef} type="text" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="amount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control ref={amountRef} type="number" required min={0} step={0.01} max={100000000} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="budgetId" >
                      <Form.Label>Budget</Form.Label>
                      <Form.Select defaultValue={budgetId} ref={budgetRef}>
                          <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                          {budgets.map(budget => (
                              <option key={budget.id} value={budget.id}>{budget.name}</option>
                          ))}
                      </Form.Select>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">Add</Button>
                  </div>
              </Modal.Body>
          </Form>
      </Modal>
    );
};

export default AddExpenseModal;
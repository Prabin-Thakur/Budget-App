import React from "react";
import { Modal, Stack, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

const ViewExpenseModal = ({ show, handleClose, budgetName, budgetId }) => {
    const { getBudgetExpense, deleteBudget, deleteExpense, deleteExpenseBudget} = useBudgets();
    const Expense = !budgetId ? getBudgetExpense("Uncategorized") : getBudgetExpense(budgetId);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {!budgetName ? "Uncategorized" : budgetName}</div>
                        <Button onClick={() => { 
                                            deleteBudget(budgetName) 
                                            deleteExpenseBudget(budgetId)
                                            handleClose()
                                            }} style={!budgetName ? {display: 'none'} : null} variant="outline-danger" >
                                                Delete
                        </Button>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {Expense.map(expense => (
                         <Stack key={expense.id} direction="horizontal" gap="2">
                              <div className="me-auto fs-4">{expense.description}</div>
                              <div className="fs-5">${parseFloat(expense.amount).toLocaleString('en-US')}</div>
                              <Button onClick={() => deleteExpense(expense.id)} size="sm" variant="outline-danger">&times;</Button>
                         </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpenseModal;

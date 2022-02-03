import React from "react";
import { ProgressBar, Button } from "react-bootstrap";

const BudgetCard = ({ name, amount, maxAmount, hideBars, onViewExpenseClick, hideMax, onAddExpenseClick, hideButtons }) => {
    
    function getProgressBarVariant(amount, maxAmount) {
        const ratio = amount / maxAmount
        if(ratio < 0.5) return "primary"
        if(ratio < 0.75) return "warning"
        return "danger"
    };

    function backgroundChanger(amount, maxAmount) {
        const ratio = amount / maxAmount
        if(ratio > 0.75) return "rgb(238, 211, 211)"
        return null
    }

    return(
        <div style={{ backgroundColor: backgroundChanger(amount, maxAmount)}} className="BudgetCard_box">
            <div className="Budgetcard_names">
                <div>{name}</div>
                <div>
                    <span style={ !amount ? {display : 'none'} : null}>${amount.toLocaleString('en-US')}</span>
                    <span style={ !amount || hideMax ? {display : 'none'} : null}> / </span>
                    <span style={ hideMax ? {display : 'none'} : null}> ${parseFloat(maxAmount).toLocaleString('en-US')} </span>
                </div>
            </div>
            <div style={ hideBars ? {display:'none'} : null } className="BudgetCard_bar">
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(amount, maxAmount)}
                    min={0}
                    max={maxAmount}
                    now={amount}   
                />
            </div>
            <div style={ hideButtons ? {display:'none'} : null } className="BudgetCard_buttons">
                <Button variant="outline-primary" onClick={onAddExpenseClick}>Add Expense</Button>
                <Button variant="outline-primary" onClick={onViewExpenseClick}>View Expense</Button>
            </div>
        </div>
    );
};

export default BudgetCard;
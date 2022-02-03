import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetContext";

const TotalBudgetCard = props => {
    const { budgets, expenses } = useBudgets();
    
    const amount = expenses.filter(expense => expense.budgetId !== "Uncategorized").reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const maxAmount = budgets.reduce((total, expense) => total + parseFloat(expense.maxAmount), 0);
    
    
    if(amount === 0) return null
           
    return <BudgetCard amount={amount} maxAmount={maxAmount} name="Total" {...props} />
       
};

export default TotalBudgetCard;
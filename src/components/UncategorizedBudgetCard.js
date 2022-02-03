import React from "react";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetContext";

const UncategorizedBudgetCard = props => {
    const { getBudgetExpense } = useBudgets();
    const amount = getBudgetExpense(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + parseFloat(expense.amount), 0)
     
    if(amount === 0) return null
           
    return <BudgetCard amount={amount} gray name="Uncategorized" {...props} />
       
};

export default UncategorizedBudgetCard;
import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';

export const BudgetContext = createContext();

export function useBudgets() {
    return useContext(BudgetContext)
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetProvider = props => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function addBudget({name, maxAmount}){
        setBudgets(prevBudget => {
            if(prevBudget.find(budget => budget.name === name || name === "Uncategorized" || name === "uncategorized")){
                alert('Cant\'t use the same budget name twice.')
                return prevBudget;
            }
            return [...prevBudget, {id: uuidv4(), name, maxAmount}]
        })
    }

    function addExpense({budgetId, amount, description}){
        setExpenses(prevExpenses => {
            if(prevExpenses.find(expense => expense.description === description)){
                alert('Cant\'t use the same description twice.')
                return prevExpenses
            }
            return [...prevExpenses, {id: uuidv4(), budgetId, amount, description}]
        })
    }

    function getBudgetExpense(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function deleteBudget(name){
        setBudgets(budgets.filter(budget => budget.name !== name))
    }

    function deleteExpense(id){
        setExpenses(expenses.filter(expense => expense.id !== id))
    }

    function deleteExpenseBudget(id){
        setExpenses(expenses.filter(expense => expense.budgetId !== id))
    }

    return(
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            addBudget,
            addExpense,
            getBudgetExpense,
            deleteBudget,
            deleteExpense,
            deleteExpenseBudget
            }}
        >
            {props.children}
        </BudgetContext.Provider>
    );
};
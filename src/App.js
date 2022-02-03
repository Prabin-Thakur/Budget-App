import React, { useState} from "react";
import { Button } from "react-bootstrap";
import "./app.css"
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpenseModal from "./components/ViewExpenseModal";
import { useBudgets } from "./contexts/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

const App = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal,setShowAddExpenseModal] = useState(false)
    const [showViewExpenseModal, setShowViewExpenseModal] = useState(false)
    const [addBudgetId, setBudgetId] = useState();
    const [addBudgetName, setBudgetName] = useState();
    const [addViewExpenseId, setViewExpenseId] = useState();
    const { budgets, getBudgetExpense} = useBudgets();

    function openAddExpenseModal(budgetId){
        setShowAddExpenseModal(true);
        setBudgetId(budgetId);
    }

    function openAddViewExpenseModal(budgetName, budgetId){
        setBudgetName(budgetName);
        setViewExpenseId(budgetId);
        setShowViewExpenseModal(true);
    }

    return(
        <div className="App">
            <div className="Header">
                <div>
                    <h1>Budgets</h1>
                </div>
                <div className="Header_divs">
                    <Button variant="outline-primary" onClick={() =>setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="outline-primary" onClick={openAddExpenseModal} >Add Expense</Button>
                </div>
            </div>
            <div className="BudgetCard">
                {budgets.map((budget => {        
                    const amount = getBudgetExpense(budget.id).reduce((total,expense) => total + parseInt(expense.amount), 0)
                    return(
                            <BudgetCard onViewExpenseClick={() => openAddViewExpenseModal(budget.name, budget.id)} onAddExpenseClick={() => openAddExpenseModal(budget.id)} key={budget.id} name={budget.name} amount={amount} maxAmount={budget.maxAmount} />
                    )
                }))}
                <UncategorizedBudgetCard hideMax={true} hideSlash={true} hideBars={true} onViewExpenseClick={() => openAddViewExpenseModal()} onAddExpenseClick={() => openAddExpenseModal()} setShowViewExpenseModal={setShowViewExpenseModal} />
                <TotalBudgetCard hideButtons={true}/>
            </div>
            <div>
                <AddBudgetModal 
                    show={showAddBudgetModal}
                    handleClose={() => setShowAddBudgetModal(false)}  
                />
                <AddExpenseModal 
                    show={showAddExpenseModal}
                    handleClose={() => setShowAddExpenseModal(false)}
                    budgetId={addBudgetId}
                />
                <ViewExpenseModal 
                    show={showViewExpenseModal}
                    handleClose={() => setShowViewExpenseModal(false)}
                    budgetId={addViewExpenseId}
                    budgetName={addBudgetName}
                />
            </div>
        </div>
    );
};

export default App;
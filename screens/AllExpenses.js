import { StyleSheet, View, Text } from 'react-native'
import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses(){

    const expensesCtx = useContext(ExpensesContext)

    return(
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total' fallbackText='No registered expenses found!!'/>
    )
}

const styles = StyleSheet.create({

})

export default AllExpenses;
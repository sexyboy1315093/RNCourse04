import { StyleSheet, View } from 'react-native'
import { useLayoutEffect, useContext } from 'react'
import IconButton from '../components/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ExpenseForm'
import { storeExpense } from '../util/http'

function ManageExpenses({ route, navigation }){

    const editedExpenseId = route.params?.expenseId
    const isEditting = !!editedExpenseId
    const expensesCtx = useContext(ExpensesContext)
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditting? 'Edit Expense' : 'Add Expense'
        })  
    },[navigation, isEditting])

    function deleteExpenseHandler(){
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(expenseData){
        if(isEditting){
            expensesCtx.updateExpense(editedExpenseId,expenseData)
        }else {
            storeExpense(expenseData)
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack();
    }

    return( 
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} submitButtonLabel={isEditting? 'Update' : 'Add'} defaultValues={selectedExpense}/>
            {isEditting && 
            <View style={styles.deleteContainer}>
                <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})

export default ManageExpenses;
import { StyleSheet, View, Text, Alert } from "react-native";
import { useState, useEffect } from 'react'
import Input from "./Input";
import Button from "./Button";


function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }){
    const[ inputs, setInput ] = useState({
        amount: defaultValues? defaultValues.amount.toString() : '',
        date: defaultValues? defaultValues.date.toISOString().slice(0,10) : '',
        description: defaultValues? defaultValues.description : ''
    })

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInput((currentInputs) => {
            return {...currentInputs, [inputIdentifier]: enteredValue}
        })
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount,       //+는 문자열을 숫자로 변환해준다
            date: new Date(inputs.date),
            description: inputs.description
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0 ;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert('Invalid input', 'Please check your input values')
            return;
        }

        onSubmit(expenseData)
    }


    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label='Amount' 
                    style={styles.rowInput}
                    textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount}}/>
                <Input 
                    label='Date' 
                    style={styles.rowInput}
                    textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date}}/>
            </View>
            <Input 
                label='Description' 
                textInputConfig={{
                multiline: true,
                // autoCorrect: false
                // autoCapitalize: 'characters'
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description}}/>
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})

export default ExpenseForm;
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';


const windowWidth = Dimensions.get("window").width;



const calculate = (expression) => {
  const sanitizedExpression = expression.replace(/[^-\d/*+.%]/g, '');
  // console.log(sanitizedExpression);

  const percentageConvertedExpression = sanitizedExpression.replace(/(\d+(\.\d+)?)%/g, '($1 * 0.01)');

  try {
    const result = new Function('return ' + percentageConvertedExpression)();
    return result.toString();
  } catch {
    return 'Error';
  }
};

const App = () => {
  const [display, setDisplay] = useState('0');
  const [currentInput, setCurrentInput] = useState('');

  const clearDisplay = () => {
    setCurrentInput('');
    setDisplay('0');
  };

  // const deleteLast = () => {
  //   setCurrentInput(currentInput.slice(0, -1));
  //   setDisplay(currentInput.slice(0, -1) || '0');
  // };

  const appendNumber = (number) => {
    setCurrentInput(currentInput + number);
    setDisplay(currentInput + number);
  };

  // const appendOperator = (operator) => {
  //   setCurrentInput(currentInput + operator);
  //   setDisplay(currentInput + operator);
  // };

  const toggleSign = () => {
    if (currentInput.charAt(0) === '-') {
      setCurrentInput(currentInput.slice(1));
      setDisplay(currentInput.slice(1));
    } else {
      setCurrentInput('-' + currentInput);
      setDisplay('-' + currentInput);
    }
  };

  const calculateResult = () => {
    const result = calculate(currentInput);
    setCurrentInput(result);
    setDisplay(result);
  };

  const renderButton = (label, onPress, style = {}) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>
        <Text style={styles.display}>{display}</Text>
        <View style={styles.buttons}>
          {renderButton('C', clearDisplay, styles.specialButton)}
          {renderButton('+-', toggleSign, styles.specialButton)}
          {renderButton('%', () => appendNumber('%'), styles.specialButton)}
          {renderButton('/', () => appendNumber('/'), styles.specialButton)}
          {renderButton('7', () => appendNumber('7'))}
          {renderButton('8', () => appendNumber('8'))}
          {renderButton('9', () => appendNumber('9'))}
          {renderButton('X', () => appendNumber('*'), styles.specialButton)}
          {renderButton('4', () => appendNumber('4'))}
          {renderButton('5', () => appendNumber('5'))}
          {renderButton('6', () => appendNumber('6'))}
          {renderButton('-', () => appendNumber('-'), styles.specialButton)}
          {renderButton('1', () => appendNumber('1'))}
          {renderButton('2', () => appendNumber('2'))}
          {renderButton('3', () => appendNumber('3'))}
          {renderButton('+', () => appendNumber('+'), styles.specialButton)}
          {renderButton('0', () => appendNumber('0'))}
          {renderButton('.', () => appendNumber('.'))}
          {renderButton('=', calculateResult, styles.equalButton)}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: "flex-end"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  calculator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  display: {
    width: '100%',
    backgroundColor: '#4CAF50', borderRadius: 10,
    width: windowWidth, textAlign: 'right',
    width: "100%",

    color: '#fff',
    textAlign: 'right',
    fontSize: 48,
    padding: 10,
    borderRadius: 5,
    justifyContent: "end",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: "purple",
    marginTop: -5,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    height: windowWidth / 5,
    width: windowWidth / 5,
    borderRadius: 200,
    borderColor: "purple",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },

  specialButton: {
    backgroundColor: 'purple',
  },

  equalButton: {
    backgroundColor: "red",
    marginTop: -5,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
    height: windowWidth / 5,
    width: windowWidth / 2.4,
    borderRadius: 200,
    borderColor: "red",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
});

export default App;
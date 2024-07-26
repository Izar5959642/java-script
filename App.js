import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState("");
  const [operatorValue, setOperatorValue] = useState("");

  const handleNumber = (value) => {
    if (readyToReplace) {
      // console.log(typeof(value) , typeof(value.toString()))
      return value.toString();
    } else {
      return answerValue.toString() + value.toString();
    }
  };

  const buttonPressed = (value) => {
    console.log(value)

    if (!isNaN(value)) {
      console.log("Enter to if statsment")

      const updatedValue = handleNumber(value.toString());
      setReadyToReplace(false);
      setAnswerValue(updatedValue);
    } else if (value === "C") {
      console.log("Enter to else if statsment")

      setAnswerValue(0);
      setMemoryValue("");
      setOperatorValue("");
      setReadyToReplace(true);
    } else if (value === "x" || value === "/" || value === "+" || value === "-") {
      if (operatorValue) {
        calculateEquals();
        setOperatorValue(value);
        setReadyToReplace(true);
      } else {
        setMemoryValue(answerValue);
        setOperatorValue(value);
        setReadyToReplace(true);
      }
    } else if (value === "=") {
      calculateEquals();
      setMemoryValue("");
      setOperatorValue("");
      setReadyToReplace(true);
    } else if (value === "+/-") {
      if (answerValue !== 0) {
        const newValue = answerValue * -1;
        setAnswerValue(newValue);
      }
    } else if (value === "%") {
      const perValue = answerValue * 0.01;
      setAnswerValue(perValue);
    }
  };

  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);
    let result = 0;

    switch (operatorValue) {
      case "x":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      default:
        return result;
    }

    setAnswerValue(result);
    setOperatorValue("");
    return result;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Green background for result line */}
        <View style={styles.resultContainer}>
          <Text style={styles.textElement}>{answerValue}</Text>
        </View>

        <StatusBar style="dark" />

        {/* Button rows */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("C")}>
            <Text style={styles.textTopfirst3btns}> C </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("+/-")}>
            <Text style={styles.textTopfirst3btns}> +/- </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("%")}>
            <Text style={styles.textTopfirst3btns}> % </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("/")}>
            <Text style={styles.textTopfirst3btns}> / </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(7)}>
            <Text style={styles.textAllbtn}> 7 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(8)}>
            <Text style={styles.textAllbtn}> 8 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(9)}>
            <Text style={styles.textAllbtn}> 9 </ Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("x")}>
            <Text style={styles.textTopfirst3btns}> x </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(4)}>
            <Text style={styles.textAllbtn}> 4 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(5)}>
            <Text style={styles.textAllbtn}> 5 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(6)}>
            <Text style={styles.textAllbtn}> 6 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("-")}>
            <Text style={styles.textTopfirst3btns}> - </ Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(1)}>
            <Text style={styles.textAllbtn}> 1 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(2)}>
            <Text style={styles.textAllbtn}> 2 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(3)}>
            <Text style={styles.textAllbtn}> 3 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed("+")}>
            <Text style={styles.textTopfirst3btns}> + </ Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(0)}>
            <Text style={styles.textLongbtn}> 0 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnc} onPress={() => buttonPressed(".")}>
            <Text style={styles.textTopfirst3btns}> . </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.longbtn} onPress={() => buttonPressed("=")}>
            <Text style={styles.textTopfirst3btns}> = </ Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resultContainer: {
    width: "100%",
    width: windowWidth, textAlign: 'right',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 0,
    marginLeft: 0,
    display: "flex",
    justifyContent: "end",
    textAlign: "right",
    backgroundColor: "green", borderRadius: 10
  },
  textElement: {
    color: "white",
    fontSize: 70,
    textAlign: "right",
  },
  btnc: {
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
  longbtn: {
    backgroundColor: "red",
    marginTop: -5,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
    height: windowWidth / 5,
    width: windowWidth / 2.4,
    borderRadius: 200,
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textAllbtn: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  textLongbtn: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    color: "white",
    textAlign: "left",
    justifyContent: "center",
  },
  textTopfirst3btns: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
});

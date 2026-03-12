import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handlePress = (type: string, value: string) => {
    if (type === 'number') {
      if (display === '0' || display === 'Error') {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
    
    if (type === 'operator') {
      setExpression(display + ' ' + value);
      setDisplay('0');
    }
    
    if (type === 'clear') {
      setDisplay('0');
      setExpression('');
    }
    
    if (type === 'delete') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    }
    
    if (type === 'equal') {
      try {
        const prev = parseFloat(expression.split(' ')[0]);
        const current = parseFloat(display);
        const op = expression.split(' ')[1];
        
        if (isNaN(prev) || isNaN(current)) return;
        
        let result = 0;
        switch(op) {
          case '+': result = prev + current; break;
          case '-': result = prev - current; break;
          case '×': result = prev * current; break;
          case '÷': 
            if (current === 0) {
                setDisplay('Error');
                setExpression('');
                return;
            }
            result = prev / current; 
            break;
          case '%': result = prev % current; break;
        }
        
        result = Math.round(result * 100000000) / 100000000;
        setDisplay(String(result));
        setExpression('');
      } catch(e) {
        setDisplay('Error');
      }
    }
  };

  const Button = ({ title, type, styleClass }: any) => (
    <TouchableOpacity 
      style={[styles.button, styles[styleClass]]} 
      activeOpacity={0.7}
      onPress={() => handlePress(type, title)}
    >
      <Text style={[styles.buttonText, styles[styleClass + 'Text']]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>{expression}</Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{display}</Text>
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          <Button title="AC" type="clear" styleClass="actionBtn" />
          <Button title="⌫" type="delete" styleClass="actionBtn" />
          <Button title="%" type="operator" styleClass="actionBtn" />
          <Button title="÷" type="operator" styleClass="operatorBtn" />
        </View>
        <View style={styles.row}>
          <Button title="7" type="number" styleClass="numberBtn" />
          <Button title="8" type="number" styleClass="numberBtn" />
          <Button title="9" type="number" styleClass="numberBtn" />
          <Button title="×" type="operator" styleClass="operatorBtn" />
        </View>
        <View style={styles.row}>
          <Button title="4" type="number" styleClass="numberBtn" />
          <Button title="5" type="number" styleClass="numberBtn" />
          <Button title="6" type="number" styleClass="numberBtn" />
          <Button title="-" type="operator" styleClass="operatorBtn" />
        </View>
        <View style={styles.row}>
          <Button title="1" type="number" styleClass="numberBtn" />
          <Button title="2" type="number" styleClass="numberBtn" />
          <Button title="3" type="number" styleClass="numberBtn" />
          <Button title="+" type="operator" styleClass="operatorBtn" />
        </View>
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.zeroBtn]} 
            activeOpacity={0.7}
            onPress={() => handlePress('number', '0')}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <Button title="." type="number" styleClass="numberBtn" />
          <Button title="=" type="equal" styleClass="operatorBtn" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  displayContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  expressionText: { color: '#aaaaaa', fontSize: 24, marginBottom: 10 },
  displayText: { color: '#ffffff', fontSize: 75, fontWeight: '300' },
  keypad: { paddingBottom: 30, paddingHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  button: { width: 75, height: 75, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  zeroBtn: { width: 165, height: 75, borderRadius: 40, alignItems: 'flex-start', paddingLeft: 30, backgroundColor: '#333333' },
  numberBtn: { backgroundColor: '#333333' },
  actionBtn: { backgroundColor: '#a5a5a5' },
  operatorBtn: { backgroundColor: '#ff9f0a' },
  buttonText: { fontSize: 32, color: '#ffffff' },
  actionBtnText: { color: '#000000' },
  operatorBtnText: { color: '#ffffff' },
});

export default App;

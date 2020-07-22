import React from 'react';

import { View, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    width: '70%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1
    }
  }
})

export default Input;
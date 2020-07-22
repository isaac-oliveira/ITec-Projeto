import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

const Add = () => {
  const [name, setName] = useState("");

  const navigation = useNavigation();

  async function handleRegister() {
    if(name) {
      await api.post('/tec', {
        name
      });
      navigation.goBack();
    } else {
      Alert.alert('Ops!', "Campo vazio")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre</Text>
      <Text style={styles.subtitle}>Uma nova tecnologia</Text>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F06543',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: "#313638",
    fontSize: 22,
    fontWeight: 'bold'
  },
  subtitle: {
    color: "#313638",
    paddingBottom: 10
  }
})

export default Add;
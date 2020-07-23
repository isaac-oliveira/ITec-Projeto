import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, Image, StyleSheet } from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

import logo from '../assets/logo.png';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('itec3@gmail.com');
  const [password, setPassword] = useState('12345');

  async function handleLogin() {
    await login(email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.circle}>
        <Image style={styles.img} source={logo} />
      </View>
      <View style={styles.row}>
        <View style={styles.line}/>
        <Text style={styles.title}>LOGIN</Text>
        <View style={styles.line}/>
      </View>
      <Input placeholder="E-mail" value={email} onChangeText={setEmail}/>
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F06543',
    justifyContent: 'center'
  },
  circle: {
    padding: 10,
    borderRadius: 200,
    backgroundColor: '#DA5C3D',
    alignSelf: 'center',
    marginVertical: 15
  },
  img: {
    width: 90,
    height: 90
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: '20%',
    height: 1,
    backgroundColor: "#313638"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313638',
    paddingHorizontal: 10
  }
})

export default Login;
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import Input from '../components/Input';
import Button from '../components/Button';
import Coords from '../components/Coords';

import useAuth from '../hooks/useAuth';

import logo from '../assets/logo.png';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('itec@gmail.com');
  const [password, setPassword] = useState('12345');
  const [coords, setCoords] = useState(null);

  async function handleLogin() {
    await register(email, password, coords.lat, coords.long);
  }

  async function handleLoadPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if(status === "granted") {
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      
      setCoords({ lat: latitude, long: longitude })
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.circle}>
        <Image style={styles.img} source={logo} />
      </View>
      <View style={styles.row}>
        <View style={styles.line}/>
        <Text style={styles.title}>CADASTRO</Text>
        <View style={styles.line}/>
      </View>
      <Input placeholder="E-mail" value={email} onChangeText={setEmail}/>
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} />

        <View style={styles.coords}>
          <Coords long={coords?.long} lat={coords?.lat}/>
          <TouchableOpacity style={styles.btnContainer} onPress={handleLoadPosition}>
            <Text style={styles.btnText}>Carregar</Text>
          </TouchableOpacity>
        </View>
      <Button title="Cadastrar" onPress={handleLogin} />
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
    width: '14%',
    height: 1,
    backgroundColor: "#313638"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313638',
    paddingHorizontal: 10
  },
  coords: {
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
  },
  btnContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: "#313638",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default Register;
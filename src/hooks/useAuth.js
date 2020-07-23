import React, { useState, useEffect, createContext, useContext } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("@itec/token").then(token => {
      if(token) {
        AsyncStorage.getItem("@itec/user").then(user => {
          setUser(user);
          setLogged(token)
        })
      }
    });
    
  }, []);

  async function login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    const { status, data } = response;

    if(status === 200) {
      const { user, token } = data;

      await AsyncStorage.setItem("@itec/token", token);
      await AsyncStorage.setItem("@itec/user", JSON.stringify(user));

      setLogged(true)
      setUser(user);
    } else {
      Alert.alert("Ops!", data.error)
    }
    
  }

  async function register(email, password, lat, long) {
    const response = await api.post('/auth/register', {
      email,
      password,
      lat,
      long
    });

    const { status, data } = response;

    if(status === 200) {
      const { user, token } = data;

      await AsyncStorage.setItem("@itec/token", token);
      await AsyncStorage.setItem("@itec/user", JSON.stringify(user));

      setLogged(true)
      setUser(user);
    } else {
      Alert.alert("Ops!", data.error)
    }

  }

  async function logout() {
    await AsyncStorage.clear();
    setLogged(false)
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ logged, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext)

  return context;
}


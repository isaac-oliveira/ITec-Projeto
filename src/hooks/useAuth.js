import React, { useState, useEffect, createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("@itec/token").then(token => {
      console.log(token)
      setLogged(token)
    });
  }, []);

  async function login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    const { data } = response;

    const { user, token } = data;

    await AsyncStorage.setItem("@itec/token", token);

    setLogged(true)
    setUser(user);
  }

  async function logout() {
    await AsyncStorage.clear();
    setLogged(false)
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ logged, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext)

  return context;
}


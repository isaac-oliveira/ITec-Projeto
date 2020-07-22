import React from 'react'
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../pages/Login';
import AppRouter from './AppRouter';

import useAuth from '../hooks/useAuth';

const Routes = () => {
  const { logged, logout } = useAuth();

  if(!logged)
    return <Login />

  return (
    <NavigationContainer>
      <AppRouter/>
    </NavigationContainer>
  )
}

export default Routes;
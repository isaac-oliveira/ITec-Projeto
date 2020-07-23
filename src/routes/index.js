import React from 'react'
import { Button } from 'react-native';

import AuthRouter from './AuthRouter';
import AppRouter from './AppRouter';

import useAuth from '../hooks/useAuth';

const Routes = () => {
  const { logged, logout } = useAuth();

  if(!logged)
    return <AuthRouter />

  return (
      <AppRouter/>
  )
}

export default Routes;
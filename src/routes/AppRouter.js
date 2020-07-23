import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';

import Home from '../pages/Home';
import Add from '../pages/Add';
import Profile from '../pages/Profile';

const AppStack = createStackNavigator();

const AppRouter = () => {
  return (
    <AppStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AppStack.Screen name="Home" component={Home} /> 
      <AppStack.Screen name="Add" component={Add} /> 
      <AppStack.Screen name="Profile" component={Profile} /> 
    </AppStack.Navigator>
  )
};

export default AppRouter;

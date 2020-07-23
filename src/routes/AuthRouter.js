import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Tabs = createBottomTabNavigator();

const iconsName = {
  Login: 'user',
  Register: 'user-plus'
}

const TabIcon = (props) => {
  const name = iconsName[props.route.name];

  return <Feather name={name || 'info'} color={props.color} size={18} />
}

const AuthRouter = () => {
  return (
    <Tabs.Navigator 
      screenOptions={(p) => ({
        tabBarIcon: (props) => <TabIcon {...props} {...p} />,
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#313638',
        inactiveTintColor: '#797979',
        style: {
          backgroundColor: '#DA5C3D',
          borderTopWidth: 0
        }
      }}>
      <Tabs.Screen name="Login" component={Login} />
      <Tabs.Screen name="Register" component={Register} />
    </Tabs.Navigator>
  );
}

export default AuthRouter;
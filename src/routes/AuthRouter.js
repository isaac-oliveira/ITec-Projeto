import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Login from '../pages/Login';
import Register from '../pages/Register';

const { Navigator, Screen } = createBottomTabNavigator();

const iconNames = {
	Login: 'user',
	Register: 'user-plus',
};

const TabBarIcon = (props) => {
	const name = iconNames[props.name] || 'info';

	return <Feather name={name} color={props.color} size={props.size} />;
};

const TabBarButton = (props) => {
	const isFocused = props.isFocused();

	return (
		<TouchableOpacity
			{...props}
			style={{
				flex: 1,
				borderTopColor: '#313638',
				borderTopWidth: isFocused ? 2 : 0,
			}}
		/>
	);
};

const AuthRouter = () => {
	return (
		<Navigator
			screenOptions={({ navigation: { isFocused }, route: { name } }) => ({
				tabBarIcon: (tabBarIconProps) => (
					<TabBarIcon name={name} {...tabBarIconProps} />
				),
				tabBarButton: (tabBarButtonProps) => (
					<TabBarButton isFocused={isFocused} {...tabBarButtonProps} />
				),
			})}
			tabBarOptions={{
				keyboardHidesTabBar: true,
				showLabel: false,
				activeTintColor: '#313638',
				inactiveTintColor: '#E0DFD5',
				style: {
					backgroundColor: '#DA5C3D',
					borderTopWidth: 0,
				},
			}}
		>
			<Screen name="Login" component={Login} />
			<Screen name="Register" component={Register} />
		</Navigator>
	);
};

export default AuthRouter;
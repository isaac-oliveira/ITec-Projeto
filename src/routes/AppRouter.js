import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Drawer from './DrawerRouter';;
import AddTec from '../pages/AddTec';

const { Navigator, Screen } = createStackNavigator();

const AppRouter = () => {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="Drawer" component={Drawer} />
			<Screen name="AddTec" component={AddTec} />
		</Navigator>
	);
};

export default AppRouter;
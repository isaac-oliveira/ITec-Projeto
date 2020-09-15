import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { ScrollView, View, Image } from 'react-native';

import Home from '../pages/Home';
import Profile from '../pages/Profile';

import profile from '../assets/user-drawer.png';

const { Navigator, Screen } = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <ScrollView>
		<View style={{ flex: 1, backgroundColor: '#313638' }}>
    		<Image source={profile} resizeMode="contain" />
		</View>
      <DrawerItemList {...props} />
    </ScrollView>
  );
}

const DrawerRouter = () => {
	return (
		<Navigator 
			drawerContent={(props) => <CustomDrawerContent {...props} />} 
			drawerContentOptions={{
				activeTintColor: '#F06543',
			}}>
			<Screen name="Home" component={Home} />
			<Screen name="Profile" component={Profile} />
		</Navigator>
	);
};

export default DrawerRouter;
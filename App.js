import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/hooks/useAuth';
import Routes from './src/routes';

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#DA5C3D" />
			<View style={styles.content}>
				<NavigationContainer>
					<AuthProvider>
						<Routes />
					</AuthProvider>
				</NavigationContainer>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#DA5C3D',
	},
	content: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default App;
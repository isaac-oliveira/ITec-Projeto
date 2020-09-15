	
import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";

import useAuth from '../hooks/useAuth';
import IconButton from '../components/IconButton';
import Coords from '../components/Coords';

import profile from '../assets/user.png';

const { width } = Dimensions.get('screen');

const Profile = () => {
	const { user, logout } = useAuth();
	const { openDrawer } = useNavigation();

	console.log(user);

	function handleOpenDrawer() {
		openDrawer();
	}

	function handleLogout() {
		logout();
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<IconButton name="menu" onPress={handleOpenDrawer} />
				<Image style={styles.img} source={profile} resizeMode="center" />
				<IconButton name="log-out" onPress={handleLogout} />
			</View>
			<Text style={styles.email}>{user.email}</Text>

			<MapView 
				style={styles.map}  
				initialRegion={{
		      latitude: user.lat,
		      longitude: user.long,
		      latitudeDelta: 0.0922,
      		longitudeDelta: 0.0421,
	    }}>

	    <Marker 
	    	coordinate={{
	    		latitude: user.lat,
		      longitude: user.long,
	    	}} />

	    </MapView>

			<View style={styles.card}>
				<Coords lat={user.lat} long={user.long} />
			</View>
		 
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E0DFD5'
	},
	header: {
		flexDirection: 'row',
		backgroundColor: '#F06543',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1
		}
	},
	img: {
		flex: 1,
		paddingVertical: 25,
	},
	email: {
		padding: 10,
		fontSize: 22,
		color: '#313638'
	},
	map: {
		width: width * 0.8,
		height: width * 0.6,
		marginVertical: 20,
		alignSelf: 'center',
		borderRadius: 10,
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1
		}
	},
	card: {
		margin: 10,
		width: '60%',
		borderRadius: 10,
		backgroundColor: '#fff',
		alignSelf: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1
		}
	}
})

export default Profile;
import React, { useState, useRef } from 'react';
import {
	KeyboardAvoidingView,
	View,
	Image,
	Text,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';

import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import Coords from '../components/Coords';

import logo from '../assets/logo.png';

const Register = () => {
	const [location, setLocation] = useState(null);

	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const registerButtonRef = useRef(null);

	const { register } = useAuth();

	const handleLoaderLocation = async () => {
		const { status } = await Location.requestPermissionsAsync();
		if (status === 'granted') {
			const location = await Location.getCurrentPositionAsync({});

			const { latitude, longitude } = location.coords;

			setLocation({
				lat: latitude,
				long: longitude,
			});
		}
	};

	const handleRegister = async () => {
		if (!registerButtonRef.current.loading) {
			registerButtonRef.current.showLoading();
			const email = emailInputRef.current.value;
			const password = passwordInputRef.current.value;

			if (!email) {
				Alert.alert('Ops!', 'E-mail está vazio');
				registerButtonRef.current?.hideLoading();
				return;
			}
			if (!password) {
				Alert.alert('Ops!', 'Senha está vazio');
				registerButtonRef.current?.hideLoading();
				return;
			}
			if (!location.lat && !location.long) {
				Alert.alert('Ops!', 'A localização precisa ser fornecida');
				registerButtonRef.current?.hideLoading();
				return;
			}

			const { sucess, error } = await register(email, password, location);
			if (!sucess) {
				Alert.alert('Ops!', error || 'Servidor não está respondendo');
				registerButtonRef.current?.hideLoading();
			}
		}
	};

	const handleSubmitEmail = () => {
		passwordInputRef.current.focus();
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<View style={styles.circle}>
				<Image style={styles.img} source={logo} />
			</View>
			<View style={styles.row}>
				<View style={styles.line} />
				<Text style={styles.title}>CADASTRO</Text>
				<View style={styles.line} />
			</View>
			<Input
				ref={emailInputRef}
				placeholder="E-mail"
				keyboardType="email-address"
				returnKeyType="next"
				onSubmitEditing={handleSubmitEmail}
			/>

			<Input
				ref={passwordInputRef}
				placeholder="Senha"
				returnKeyType="go"
				secureTextEntry
			/>
			<View style={styles.coords}>
				<Coords lat={location?.lat} long={location?.long} />
				<TouchableOpacity
					style={styles.btnContainer}
					onPress={handleLoaderLocation}
				>
					<Text style={styles.btnText}>Carregar</Text>
				</TouchableOpacity>
			</View>
			<Button
				ref={registerButtonRef}
				title="Cadastrar"
				onPress={handleRegister}
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F06543',
		justifyContent: 'center',
	},
	circle: {
		padding: 10,
		borderRadius: 200,
		backgroundColor: '#DA5C3D',
		alignSelf: 'center',
		marginVertical: 15,
	},
	img: {
		width: 90,
		height: 90,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	line: {
		width: '20%',
		height: 2,
		backgroundColor: '#313638',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#313638',
		paddingHorizontal: 10,
	},
	coords: {
		margin: 10,
		width: '70%',
		borderRadius: 10,
		backgroundColor: '#fff',
		alignSelf: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		overflow: 'hidden',
	},
	btnContainer: {
		padding: 10,
		width: '100%',
		backgroundColor: '#313638',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default Register;
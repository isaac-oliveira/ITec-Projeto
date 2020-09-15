import React, { useRef } from 'react';
import {
	KeyboardAvoidingView,
	View,
	Image,
	Text,
	Alert,
	StyleSheet,
} from 'react-native';

import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

import logo from '../assets/logo.png';

const Login = () => {
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const loginButtonRef = useRef(null);

	const { login } = useAuth();

	const handleLogin = async () => {
		if (!loginButtonRef.current?.loading) {
			loginButtonRef.current?.showLoading();
			const email = emailInputRef.current.value;
			const password = passwordInputRef.current.value;

			const { sucess, error } = await login(email, password);
			if (!sucess) {
				Alert.alert('Ops!', error || 'Servidor não está respondendo');
				loginButtonRef.current?.hideLoading();
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
				<Text style={styles.title}>LOGIN</Text>
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
				onSubmitEditing={handleLogin}
			/>

			<Button ref={loginButtonRef} title="Entrar" onPress={handleLogin} />
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
});

export default Login;

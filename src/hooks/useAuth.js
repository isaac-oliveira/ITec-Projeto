import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [logged, setLogged] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		api.addAsyncRequestTransform(async (request) => {
			const userInfoJson = await AsyncStorage.getItem('@itec/userInfo');
			if (userInfoJson) {
				const { token } = JSON.parse(userInfoJson);

				const tokenOld = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTgzYWRiOWNhMWRiMDAxNzY3MzhhOSIsImlhdCI6MTU5OTc0NzI3NiwiZXhwIjoxNTk5ODMzNjc2fQ.-U4evmFynmnHf_YX4GhNYOaHWSEFsbKqjXxbirfLqvs'

				request.headers['Authorization'] = `Bearer ${token}`;
			}
		});

		api.addAsyncResponseTransform(async (response) => {
			if(response.status === 401) {
				Alert.alert(
					"Ops!", 
					"Você precisa fazer login novamente", 
					[{ text: 'OK', onPress: () => logout()}], 
					{ cancelable: false }
				);
			}
		});
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('@itec/userInfo').then((userInfoJson) => {
			if (userInfoJson) {
				const userInfo = JSON.parse(userInfoJson);

				setUser(userInfo.user);
				setLogged(true);
			} else {
				setLogged(false);
			}
		});
	}, []);

	async function login(email, password) {
		const response = await api.post('/auth/login', {
			email,
			password,
		});

		if (response.ok) {
			const userInfoJson = JSON.stringify(response.data);
			try {
				await AsyncStorage.setItem('@itec/userInfo', userInfoJson);
				setUser(response.data.user);
				setLogged(true);
			} catch (err) {
				setLogged(false);
			}
		}

		return {
			sucess: response.ok,
			error: response.data?.error,
		};
	}

	async function register(email, password, location) {
		const response = await api.post('/auth/register', {
			email,
			password,
			...location,
		});

		if (response.ok) {
			const userInfoJson = JSON.stringify(response.data);
			try {
				await AsyncStorage.setItem('@itec/userInfo', userInfoJson);
				setUser(response.data.user);
				setLogged(true);
			} catch (err) {
				setLogged(false);
			}
		}

		return {
			sucess: response.ok,
			error: response.data?.error,
		};
	}

	async function logout() {
		setLogged(false);
		setUser(null);
		await AsyncStorage.clear();
	}

	return (
		<AuthContext.Provider value={{ user, logged, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	const value = useContext(AuthContext);

	return value;
}
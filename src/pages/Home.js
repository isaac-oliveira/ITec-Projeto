import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../components/IconButton';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

const Home = () => {
	const [query, setQuery] = useState(null);
	const [tecs, setTecs] = useState([]);

	const { navigate, openDrawer, addListener } = useNavigation();
	const { logout } = useAuth();

	useEffect(() => {
		if(query !== null) load(query);
	}, [query]);

	useEffect(() => {
		const unsubscribe = addListener("focus", () => {
			setQuery(state => {
				load(state || "");
				return state;
			});
		});
		return unsubscribe
	}, [load]);

	const load = useCallback((search) => {
		api.get(`/tec?search=${search}`).then((response) => {
			if(response.ok) {
				setTecs(response.data.tecs);
			}
		});
	}, []);

	function handleLogout() {
		logout()
	}

	function handleOpenDrawer() {
		openDrawer()
	}

	function handleNavigateAdd() {
		navigate('AddTec');
	}

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<View style={styles.circle}>
				<Text style={styles.initial}>{item.name[0]}</Text>
			</View>
			<Text style={styles.name}>{item.name}</Text>
		</View>
	);

	

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.search}>
					<IconButton name="menu" onPress={handleOpenDrawer} />
					<TextInput
						style={styles.input}
						placeholder="Pesquisar"
						value={query}
						onChangeText={setQuery}
					/>
					<IconButton name="log-out" onPress={handleLogout}/>
				</View>
			</View>
			{ tecs.length === 0 && <Text style={styles.textEmpty}>Lista está vazia</Text>}
			{ tecs.length !== 0 &&
				<FlatList
					data={tecs}
					keyExtractor={(tec) => tec._id}
					renderItem={renderItem}
				/>}
			<IconButton name="plus" color="#fff" style={styles.fab} onPress={handleNavigateAdd} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E0DFD5'
	},
	header: {
		backgroundColor: '#F06543',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	search: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 10,
		margin: 10,
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	input: {
		flex: 1,
	},
	textEmpty: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		margin: 10,
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	circle: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#797979',
		borderRadius: 50,
		padding: 5,
		margin: 5,
	},
	initial: {
		fontSize: 28,
		color: '#fff',
	},
	name: {
		marginHorizontal: 10,
	},
	fab: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		padding: 20,
		margin: 16,
		borderRadius: 50,
		backgroundColor: '#313638',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
});

export default Home;
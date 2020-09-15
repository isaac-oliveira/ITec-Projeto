import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const AddTec = () => {
	const nameInputRef = useRef(null);
	const buttonRef = useRef(null);

	const { goBack } = useNavigation();


	function handleNavigateBack() {
		goBack();
	}

	async function handleRegisterTec() {
		if(!buttonRef.current.loading) {
			buttonRef.current.showLoading();
			const name = nameInputRef.current.value;
			if(name) {
				const response = await api.post('/tec', {
					name
				});
				if(response.ok) goBack();
				else if(response.status !== 401) Alert.alert('Ops!', response.data.error);
			} else {
				Alert.alert("Ops!", "O nome está vazio");
			}
			buttonRef.current.hideLoading();
		}
	}

	return(
		<View style={styles.container}>
			<Text style={styles.title}>Cadastre</Text>
			<Text style={styles.subtitle}>uma nova tecnologia</Text>
			<Input ref={nameInputRef} placeholder="Nome" />
			<Button ref={buttonRef} title="Cadatrar" onPress={handleRegisterTec}/>
			<TouchableOpacity style={styles.btnBack} onPress={handleNavigateBack}>
				<Text style={styles.btnTextBack}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F06543',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: "#313638",
    fontSize: 22,
    fontWeight: 'bold'
  },
  subtitle: {
    color: "#313638",
    paddingBottom: 10
  },
  btnBack: {
  	width: '100%',
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: '#DA5C3D',
  	padding: 20,
  	position: 'absolute',
  	bottom: 0
  },
  btnTextBack: {
  	color: '#fff'
  }
})

export default AddTec;
import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const IconButton = ({ name, color = '#313638', ...rest }) => {
	useEffect(() => {
		console.log('IconButton');
	}, []);

	return (
		<TouchableOpacity style={styles.btn} {...rest}>
			<Feather name={name} color={color} size={18} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		padding: 15,
	},
});

export default IconButton;
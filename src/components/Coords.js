import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Coords = ({ lat = 'Latitude', long = 'Longitude' }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{String(long).slice(0, 12)}</Text>
			<View style={styles.line} />
			<Text style={styles.text}>{String(lat).slice(0, 12)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	line: {
		width: 1,
		height: '100%',
		backgroundColor: '#797979',
	},
	text: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 10,
		paddingHorizontal: 10,
		textAlign: 'center',
		color: '#797979',
	},
});

export default Coords;

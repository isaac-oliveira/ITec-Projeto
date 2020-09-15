import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';

const Button = ({ title, onPress }, ref) => {
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		loading,
		showLoading: () => setLoading(true),
		hideLoading: () => setLoading(false),
	}));

	return (
		<TouchableOpacity
			style={styles.container}
			disabled={loading}
			onPress={onPress}
		>
			{loading && (
				<ActivityIndicator style={styles.loading} color="#fff" size="small" />
			)}
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 10,
		borderRadius: 50,
		width: '50%',
		alignSelf: 'center',
		backgroundColor: '#313638',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 3,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},

	loading: {
		position: 'absolute',
		left: 10,
	},

	title: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default forwardRef(Button);

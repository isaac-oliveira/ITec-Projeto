import React, {
	memo,
	forwardRef,
	useState,
	useImperativeHandle,
	useRef,
} from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props, ref) => {
	const [value, setValue] = useState(props.defaultValue);
	const inputRef = useRef(null);

	useImperativeHandle(ref, () => ({
		value,
		focus: () => {
			inputRef.current.focus();
		},
	}));

	return (
		<TextInput
			ref={inputRef}
			{...props}
			style={styles.input}
			value={value}
			onChangeText={setValue}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		padding: 10,
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
	},
});

export default forwardRef(Input);
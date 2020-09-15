import { create } from 'apisauce';
import { AsyncStorage, Alert } from 'react-native';

const api = create({
	baseURL: 'https://api-itec.herokuapp.com',
	timeout: 5000,
});


export default api;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTgzYWRiOWNhMWRiMDAxNzY3MzhhOSIsImlhdCI6MTU5OTc0NzI3NiwiZXhwIjoxNTk5ODMzNjc2fQ.-U4evmFynmnHf_YX4GhNYOaHWSEFsbKqjXxbirfLqvs
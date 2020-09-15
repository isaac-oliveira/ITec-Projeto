import React from 'react';
import { AppLoading } from 'expo';

import useAuth from '../hooks/useAuth';

import AuthRouter from './AuthRouter';
import AppRouter from './AppRouter';

const Routes = () => {
	const { logged } = useAuth();

	if (logged === null) {
		return <AppLoading />;
	}

	if (logged === false) {
		return <AuthRouter />;
	}
	return <AppRouter />;

};

export default Routes;

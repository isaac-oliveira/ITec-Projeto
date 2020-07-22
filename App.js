import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import Routes from './src/routes';

import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#DA5C3D"/>
        <Routes />
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DA5C3D'
  },
});

export default App;

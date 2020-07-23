import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';

import { Feather } from '@expo/vector-icons';

import Coords from '../components/Coords';
import useAuth from '../hooks/useAuth';

import profile from '../assets/user.png'

const Profile = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  function handleHome() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={handleHome}>
          <Feather name="home" size={18} color="#313638"/>
        </TouchableOpacity>
        <Image style={styles.img} source={profile} resizeMode='contain' />
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Feather name="log-out" size={18} color="#313638"/>
        </TouchableOpacity>
      </View>
      <Text style={styles.email}>{user?.email}</Text>

      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: user?.lat,
          longitude: user?.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

          <Marker 
            coordinate={{
              latitude: user?.lat,
              longitude: user?.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}/>
        
        </MapView>

      <View style={styles.card}>
        <Coords lat={user?.lat} long={user?.long}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F06543',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  btn: {
    padding: 15,
  },
  img: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 25,
  },
  email: {
    padding: 10,
    fontSize: 22,
    color: '#313638'
  },
  map: {
    width: '60%',
    height: '35%',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  card: {
    margin: 10,
    width: '60%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1
    }
  }
})

export default Profile;
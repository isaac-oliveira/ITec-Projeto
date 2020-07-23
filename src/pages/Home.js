import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../services/api';

import { Feather } from '@expo/vector-icons'

import useAuth from '../hooks/useAuth';

const Home = () => {
  const [tecs, setTecs] = useState([]);
  const [query, setQuery] = useState('')

  const { logout } = useAuth();

  const navigation = useNavigation();


  useEffect(() => {
    function load() {
      api.get(`/tec?search=${query}`).then((response) => {
        setTecs(response.data.tecs)
      });
    }
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return () => {
      unsubscribe();
    }
  }, [navigation, query]);

  function handleAdd() {
    navigation.navigate('Add');
  }

  function handleProfile() {
    navigation.navigate('Profile');
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.circle}>
          <Text style={styles.initial}>{item.name[0]}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <TouchableOpacity style={styles.btn} onPress={handleProfile}>
            <Feather name="user" color="#313638" size={18} />
          </TouchableOpacity>
          <TextInput  
            style={styles.input} 
            placeholder="Pesquisa"
            value={query}
            onChangeText={setQuery} />
          <TouchableOpacity style={styles.btn} onPress={logout}>
            <Feather name="log-out" color="#313638" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tecs}
        keyExtractor={(tec) => tec._id}
        renderItem={renderItem}/>
      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Feather name="plus" size={22} color="#fff"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
      height: 1
    }
  },
  btn: {
    padding: 15,
  },
  input: {
    flex: 1,
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
      height: 1
    }
  },
  circle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#797979',
    borderRadius: 50,
    padding: 5,
    margin: 5
  },
  initial: {
    fontSize: 28,
    color: '#fff'
  },
  name: {
    marginHorizontal: 10
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 20,
    margin: 16,
    borderRadius: 50,
    backgroundColor: '#313638',
    alignSelf: 'flex-end',
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

export default Home;
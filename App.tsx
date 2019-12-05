import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  MoviesList  from './src/movies-list';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Movies List</Text>
      <MoviesList> </MoviesList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});

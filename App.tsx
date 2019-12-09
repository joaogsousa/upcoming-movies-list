import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  MoviesList  from './src/movies-list';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import  DetailsScreen  from './src/details-screen';

const MainNavigator = createStackNavigator({
  Home: {screen: MoviesList},
  DetailsScreen: {screen: DetailsScreen},
});

const App = createAppContainer(MainNavigator);
export default App;

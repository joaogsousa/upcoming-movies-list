import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { MovieModel } from './movie-model';


export default class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Movie details',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const movieId = this.props.navigation.getParam('movieId', -1);

    if (movieId === -1) {
      console.log("Did not properly receive movie id")
      this.setState({error: true});
      return;
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=740f2303d838f07d3ee1fe0715a757c5&language=en-US`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        console.log("some error ocurred during movie details fetch.")
        this.setState({ error, loading: false });
      });
  };


  render() {
    console.log(" o que foi recebido no data: ", this.state.data);
    return (
      <View>
      </View>
    );
  }
} 


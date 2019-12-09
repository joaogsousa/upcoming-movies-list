import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { MovieModel } from './movie-model';

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w500';

export default class MoviesList extends Component {
    static navigationOptions = {
        title: 'Upcoming Movies List',
    };


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=740f2303d838f07d3ee1fe0715a757c5&language=en-US&page=${page}`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  getImageUrl = (imagePath) => (IMAGE_BASE_URL + imagePath);

  
  renderMovieItem = ({ item }) => (
        <ListItem
        title={`${item.title}`}
        subtitle={`Release date: ${item.release_date}`}
        containerStyle={{ borderBottomWidth: 0 }}
        leftAvatar={{ source: { uri: this.getImageUrl(item.poster_path) }}}
        onPress={() => this.props.navigation.navigate('DetailsScreen',{ movieId: item.id })}
        />
    )

  render() {
    return (
        <View style={styles.listContainer}>
            <FlatList
            data={this.state.data}
            renderItem={this.renderMovieItem}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
            />
        </View>
    );
  }
} 

const styles = StyleSheet.create({
    listContainer: {
      flex: 22,
      alignSelf: 'stretch',
    },
});
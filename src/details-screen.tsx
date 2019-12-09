import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w500';

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
      modalVisible:false,
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

  getImageUrl = (imagePath) => (IMAGE_BASE_URL + imagePath);

  render() {
    const data = this.state.data;
    return (
      <>
        {data && 
          <View style={styles.container}>
            <ScrollView style={styles.content}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.name}>{data.title}</Text>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.header}>
                    <View>
                      <Image style={styles.mainImage} source={{uri: this.getImageUrl(data.poster_path)}}/>
                    </View>
                  </View>
                </View>
              </View>


              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Overview</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.description}>{data.overview}</Text>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>General information</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.description}> Release date: {data.release_date}  </Text>
                  <Text style={styles.description}> Genre: {data.genres[0].name} </Text>
                  <Text style={styles.description}> Original language: {data.original_language} </Text>
                  <Text style={styles.description}> Popularity: {data.popularity} </Text>
                  <Text style={styles.description}> Status: {data.status} </Text>
                  <Text style={styles.description}> Vote average: {data.vote_average} </Text>
                  <Text style={styles.description}> Vote count: {data.vote_count} </Text>

                </View>
              </View>

            </ScrollView>
          </View>
        }
      </>
    );
  }
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
    backgroundColor:"#ebf0f7",
  },
  content:{
    marginLeft:10,
    marginRight:10,
    marginTop:20,
  },
  header:{
    flexDirection:'row',
  },
  mainImage:{
    width:200,
    height:200,
  },
  smallImagesContainer:{
    flexDirection:'column',
    marginLeft:30
  },
  smallImage:{
    width:60,
    height:60,
    marginTop:5, 
  },
  btnColor: {
    height:40,
    width:40,
    borderRadius:40,
    marginHorizontal:3
  },
  contentColors:{
    flexDirection:'row', 
  },
  name:{
    fontSize:22,
    color:"#696969",
    fontWeight:'bold',
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    fontSize:18,
    color:"#696969",
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },

  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle:{
    color:"#00BFFF"
  }
});  


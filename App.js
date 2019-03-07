import React,{ Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const APP_KEY = "33bf830a75bbaf2a0a9229d6c7f5c6da";

export default class App extends Component {
  state = {
    isLoaded : false,
    error : null,
    temperature:null,
    name:null
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this._getWeather(position.coords.latitude, position.coords.longitude);
    },
    error => {
      this.setState({
        error : error
      });
      console.log(error);
    }
    );
  }

  _getWeather = (lat, lon) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature : json.main.temp,
        name:json.weather[0].main,
        isLoaded : true
      });
      console.log(json.weather[0].main);
    })
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" translucent={true} backgroundColor={'transparent'} />
        { isLoaded ? (
        <Weather temp={Math.floor(temperature)} weatherName={name} />
        ) : (
        <View style={styles.loading}>
          <ActivityIndicator/>
          { error ? <Text style={styles.errorText}>{error}</Text> : null }
          <Text style={styles.loadingText}>날씨를 불러오는 중</Text>
        </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : '#fff'
  },
  errorText:{
    color:'red',
    textAlign : 'center'
  },
  loading : {
    backgroundColor : '#fdf6aa',
    flex : 1,
    justifyContent : 'flex-end'
  },
  loadingText : {
    fontSize : 35,
    marginBottom : 200,
    textAlign : 'center',
    marginTop : 24
  },
});


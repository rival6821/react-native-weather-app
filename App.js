import React,{ Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const APP_KEY = "33bf830a75bbaf2a0a9229d6c7f5c6da";
const NEAR_AIR_KOREA_KEY = "s1yAfTYEGUMulWPpUbEQSGeQRqbSHRxjfVhI1fclwmfjXzAhXhUBnBEj6YLbZbNVS%2FTr8LF58A%2FaTBDScxrx0A%3D%3D";

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

      this._changeTM(position.coords.latitude, position.coords.longitude);
      console.log('lat',position.coords.latitude);
      console.log('lon',position.coords.longitude);
    },
    error => {
      this.setState({
        error : error
      });
      console.log(error);
    }
    );
  }

  // 날씨정보 가져오기
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

  // gps좌표계를 TM좌표계로 변환
  _changeTM = ( lat, lon ) => {
    let headers = {
      Authorization : 'KakaoAK 2fc2b0132f7ab611be7e896d378ecc47'
    }
    fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lon}&y=${lat}&input_coord=WGS84&output_coord=TM`,
    { method : 'GET', headers : headers })
    .then(res => res.json())
    .then(json => {
      let tmX = json.documents[0].x;
      let tmY = json.documents[0].y;
      fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${tmX}&tmY=${tmY}&pageNo=1&numOfRows=10&ServiceKey=${NEAR_AIR_KOREA_KEY}&_returnType=json`)
      .then(res => console.log(res))
      
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


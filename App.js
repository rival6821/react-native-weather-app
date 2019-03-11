import React,{ Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, Image, TouchableHighlight } from 'react-native';
import Weather from './Weather';
import { APP_KEY, AIR_KOREA_KEY } from './env';


export default class App extends Component {
  state = {
    isWeatherLoaded : false,
    isAirLoaded : false,
    error : null,
    temperature:null,
    name:null,
    pm10Value: null,
    pm10Grade1h : null,
    pm25Value : null,
    pm25Grade1h : null,
    humidity : null
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

  _reloading = () => {
    console.log('reloading function');
    this.setState({
      isWeatherLoaded : false,
      isAirLoaded : false
    });
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
        humidity:json.main.humidity,
        isWeatherLoaded : true
      });
      console.log(json);
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
      fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${tmX}&tmY=${tmY}&pageNo=1&numOfRows=10&ServiceKey=${AIR_KOREA_KEY}&_returnType=json`)
      .then(res => res.json())
      .then(json => {
        let stationName = json.list[0].stationName;
        fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=daily&pageNo=1&numOfRows=10&ServiceKey=${AIR_KOREA_KEY}&ver=1.3&_returnType=json`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isWeatherLoaded : true,
            pm10Value : json.list[0].pm10Value,
            pm10Grade1h : this._setPmGrade(json.list[0].pm10Grade1h),
            pm25Value : json.list[0].pm25Value,
            pm25Grade1h : this._setPmGrade(json.list[0].pm25Grade1h)
          })
        })
      })
    })
  }

  _setPmGrade = (grade) => {
    if(grade === '1'){
      return '좋음';
    }else if(grade === '2'){
      return '보통';
    }else if(grade === '3'){
      return '나쁨';
    }else if(grade === '4'){
      return '매우나쁨';
    }
  }

  render() {
    const { isWeatherLoaded, isAirLoaded, error, temperature, name, pm10Value, pm10Grade1h, pm25Value, pm25Grade1h, humidity } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" translucent={true} backgroundColor={'transparent'} />
        { (isWeatherLoaded || isAirLoaded) ? (
          <>
          <TouchableHighlight onPress={() => this._reloading()} style={styles.reloadImgWrap}>
            <Image
              style={styles.reloadImg}
              source={require('./assets/reload.png')}
            />
          </TouchableHighlight>
            <Weather temp={Math.floor(temperature)} 
            weatherName={name} 
            pm10Value={pm10Value} 
            pm10Grade1h={pm10Grade1h} 
            pm25Value={pm25Value} 
            pm25Grade1h={pm25Grade1h}
            humidity={humidity}/>
          </>
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
    backgroundColor : '#fff',
    position:'relative'
  },
  reloadImgWrap : {
    width:30,
    height:30,
    position:'absolute',
    top:35,
    right:15,
    zIndex:2
  },
  reloadImg:{
    width:30,
    height:30
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


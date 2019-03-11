import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
    'Rain' : {
        colors : ['#00c6fb','#005bea'],
        title : "비가 내리고 있습니다",
        subTitle : "우산을 챙기세요",
        icon : 'ios-rainy'
    },
    'Clear' : {
        colors : ['#fef253','#ff7300'],
        title : "날씨가 화창합니다",
        subTitle : "외출하기 좋은 날씨예요",
        icon : 'ios-sunny'
    },
    'Thunderstorm' : {
        colors : ['#00ecbc','#007adf'],
        title : "천둥이 치고있습니다",
        subTitle : "외출을 자제해 주세요",
        icon : 'ios-thunderstorm'
    },
    'Drizzle' : {
        colors : ['#89f7fe','#66a6ff'],
        title : "이슬비가 내리고 있습니다",
        subTitle : "우산을 챙기세요",
        icon : 'ios-rainy'
    },
    'Snow' : {
        colors : ['#7de2fc','#b9b6e5'],
        title : "눈이 내리고 있습니다",
        subTitle : "외출에 조심하세요",
        icon : 'ios-snow'
    },
    'Clouds' : {
        colors : ['#d7d2cc','#304352'],
        title : "구름낀 날씨입니다",
        subTitle : "해를 보기 힘들것 같아요",
        icon : 'ios-cloudy'
    },
    'Atmosphere' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Haze' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Mist' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Smoke' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Dust' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Sand' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Fog' : {
        colors : ['#d7d2cc','#304352'],
        title : "안개가 자욱합니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    },
    'Squalls' : {
        colors : ['#d7d2cc','#304352'],
        title : "돌풍이 불고있습니다",
        subTitle : "외출시 주의하세요",
        icon : 'ios-menu'
    },
    'Tornado' : {
        colors : ['#d7d2cc','#304352'],
        title : "바람이 많이 불고 구름이 많습니다",
        subTitle : "운전에 조심하세요",
        icon : 'ios-menu'
    }
}

function Weather({ temp, weatherName, pm10Value, pm10Grade1h, pm25Value, pm25Grade1h }){
    return(
        <LinearGradient style = {styles.container} colors={weatherCases[weatherName].colors}>
            <View style={styles.upper}>
                <Ionicons color="white" size={144} name={weatherCases[weatherName].icon} />
                <Text style={styles.temp}>{temp} ℃</Text>
                <Text style={styles.pm}>미세먼지 : {pm10Value} ㎍/㎥ {pm10Grade1h}</Text>
                <Text style={styles.pm}>초미세먼지 : {pm25Value} ㎍/㎥ {pm25Grade1h}</Text>
            </View>
            <View style={styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text  style={styles.subTitle}>{weatherCases[weatherName].subTitle}</Text>
            </View>
        </LinearGradient>
    );
}

 Weather.propTypes = {
     temp : PropTypes.number.isRequired,
     weatherName : PropTypes.string.isRequired
 };

export default Weather;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    upper:{
        flex:3,
        alignItems:'center',
        justifyContent:'center'
    },
    temp:{
        fontSize:48,
        color:'white',
        marginTop:10
    },
    pm : {
        fontSize:20,
        marginTop:10,
        color:'white'
    },
    lower:{
        flex:2,
        alignItems:'flex-start',
        justifyContent:'flex-end',
        paddingLeft:25
    },
    title:{
        fontSize:35,
        color:'white',
        marginBottom:10,
        fontWeight:'300'
    },
    subTitle:{
        fontSize:24,
        color:'white',
        marginBottom:60
    }
});
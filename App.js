import React,{ Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView}></View>
        <View style={styles.yellowView}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : 'center',
    alignItems:'center',
  },
  redView:{
    height:50,
    width:50,
    backgroundColor:'red',
  },
  yellowView:{
    height:50,
    width:50,
    backgroundColor:'yellow',
  },
});


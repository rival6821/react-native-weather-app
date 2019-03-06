import React,{ Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  state = {
    isLoaded : false,
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        { isLoaded ? null : (
        <View style={styles.loading}>
          <ActivityIndicator/>
          <Text style={styles.loadingText}>Getting the Weather</Text>
        </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : '#fff',
  },
  loading : {
    backgroundColor : '#fdf6aa',
    flex : 1,
    justifyContent : 'flex-end',
    //paddingLeft : 25,
  },
  loadingText : {
    fontSize : 30,
    marginBottom : 100,
    textAlign : 'center',
    marginTop : 20,
  },
});


import React, {Component} from 'react';
import store from './src/store/index';
import {Provider} from 'react-redux';
import { StyleSheet, Text, View,Button,TextInput,ScrollView} from 'react-native';
import Todo from './src/components/todo'
// import * as firebase from 'firebase';

// var config = {
//     apiKey: "AIzaSyCnG6P11GDCcgqia2V2kXeJ_kndBJGF8Ho",
//     authDomain: "react-native-todo-app-android.firebaseapp.com",
//     databaseURL: "https://react-native-todo-app-android.firebaseio.com",
//     projectId: "react-native-todo-app-android",
//     storageBucket: "react-native-todo-app-android.appspot.com",
//     messagingSenderId: "802236606160"
//   };
//   firebase.initializeApp(config);

export default class App extends Component{
  
render() {
    return (
        <Provider store={store}>
            {/* <Text>adf</Text> */}
            <Todo/>
         </Provider>
    );
  }
}


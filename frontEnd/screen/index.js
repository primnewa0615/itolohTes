import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import {  Icon, Button, withTheme } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../component/register';
import Login from '../component/login';

export default function Main({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setshowAlert] = useState(false)
  const [regis, setRegis] = useState(false)
  const login = async () =>{
    await axios({
      method:"post",
      url:"http://10.0.2.2:3000/api/Users/login",
      data: {
        email:email,
        password:password
      }
    }).then(async(res) => {
      const token = res.data.id;
      const userId = res.data.userId.toString();
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", userId);
      navigation.navigate('Beranda', {
        userId:res.data.userId
      });
    }).catch(err => {
      console.log(err)
    })
  } 

  const register = async() => {
    await axios({
      method:"post",
      url:"http://10.0.2.2:3000/api/Users",
      data: {
        email:email,
        password:password
      }
    }).then(async(res) => {
      alert("Register Berhasil");
      setRegis(false);
      setEmail("");
      setPassword("")
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/img/logo.png')} 
        style={styles.logo}
      />

      {regis ?
        <Register setEmail={setEmail} setPassword={setPassword} /> :
        <Login setEmail={setEmail} setPassword={setPassword} />
      }

          <View style={styles.wrapBtn}>
            <TouchableHighlight
              activeOpacity={0.6}
              onPress={regis ? () => setRegis(false) : () => login()}
              style={!regis ? styles.button : styles.buttonGreen}
            >
              <Text style={styles.textBtn}>Login</Text>
            </TouchableHighlight>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={!regis ? () => setRegis(true) : () => register()}
              style={regis ? styles.button : styles.buttonGreen}
            >  
              <Text style={styles.textBtn}>Register</Text>
            </TouchableOpacity>
          </View>
       
       <Text style={{marginTop:"10%"}}>OR</Text>
       <View style={styles.wrapLoginOps}>
        <Image style={styles.logoOpsLogin} source={require('../assets/img/google-logo.png')} />
        <Image style={styles.logoOpsLogin} source={require('../assets/img/fb-logo.png')} />
       </View>

       
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:50
    },
    header:{
      fontSize:18,
      fontWeight:"bold",
      marginBottom: "10%"
    },
    wrapBtn:{
      width:300,
      flex:0.4,
      flexDirection:"row",
      margin:"5%",
      padding:0
    },
    logo:{
        height:100,
        width:170,
        marginBottom:"10%"
    },
    button:{
        backgroundColor:"orange",
        width: "40%",
        height:50,
        margin: "5%",
        marginBottom:0,
        borderRadius:5,
        justifyContent:"center"
    },
    buttonGreen:{
        backgroundColor:"#77d6e0",
        width: "40%",
        height:50,
        margin: "5%",
        marginBottom:0,
        borderRadius:5,
        justifyContent:"center"
    },
    textBtn:{
        color: "white",
        textAlign:"center",
        fontWeight:"bold",
    },
    input: {
        width:"100%",
        marginBottom:"5%",
        borderColor:"black",
        backgroundColor:"#e8e6e6",
        borderRadius:5,
        padding:10
    },
    wrapLoginOps:{
        flexDirection: "row"
    },
    logoOpsLogin:{
        width:40,
        height:40,
        margin:10,
        marginTop:20
    }
})

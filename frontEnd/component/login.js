import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Login({setEmail, setPassword}) {
  return (
    <>
        <Text style={styles.header}>Login</Text>

        <TextInput
            placeholder='Email'
            style={styles.input}
            onChangeText={(e) => {setEmail(e)}}
        />

        <TextInput
            placeholder='Password'
            style={styles.input}
            secureTextEntry={true}
            onChangeText= {(e)=>{setPassword(e)}}
        />
    </>
        
  );
}

const styles = StyleSheet.create({
    header:{
      fontSize:18,
      fontWeight:"bold",
      marginBottom: "10%"
    },
    input: {
        width:"100%",
        marginBottom:"5%",
        borderColor:"black",
        backgroundColor:"#e8e6e6",
        borderRadius:5,
        padding:10
    }
})

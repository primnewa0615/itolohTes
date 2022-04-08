import React, {useState, useEffect} from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImageFb from '../component/imageFb';
import {
  wrapScrollView,
  useScrollIntoView,
} from 'react-native-scroll-into-view';


export default function Beranda({navigation}) {
    const [contents, setcontents] = useState([])
    useEffect(() => {
      async function get(){
        await axios.get(`http://10.0.2.2:3000/api/Contents`)
        .then(res => {
            const result = res.data;
            setcontents(result);
        })
      }
      const unsubscribe = navigation.addListener('focus', () => {
        get()
      });
      return unsubscribe
    }, [navigation])
  return (
    <View style={styles.container}>
        <ScrollView style={{width:"100%", paddingBottom:50}}>
        {contents &&
            contents.map((c,i) => (
                <View key={i} style={styles.wrapContent}>
                    <View style={styles.wrapHeaderContent}>
                        <Ionicons.Button
                            testID="avatar"
                            name="person-circle-outline"
                            color="orange"
                            size={20}   
                            backgroundColor="white"
                            onPress={() => {console.log("go to profile")}}
                        >
                        <Text>prima</Text>
                        </Ionicons.Button>
                        </View>
                      
                    <ImageFb fileName={c.fileName} />
                    <Text >{c.caption}</Text>
                </View>
            ))
        }

         {
            contents == false && 
            <Text style={styles.noFile}>Belum ada gambar yang diupload!</Text>
        }
    
       </ScrollView>
        <TouchableHighlight 
            onPress={()=> {navigation.navigate('PostForm', {
                userId:navigation.userId
            });}}
            style={styles.postButton}
        >
            <Ionicons
                testID="postButton"
                name="camera"
                color="orange"
                size={50}   
                
            />
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
       justifyContent:"center",
       alignItems:"center"
    },
    wrapHeaderContent:{
        width:"100%",
        height:40,
        flexGrow:1
    },
    wrapContent:{
        width:"90%",
        height:400,
        margin:23,
        marginBottom:50
        
    },
    postButton: {
        position:"absolute",
        margin:20,
        bottom:0,
        right:0,
    },
    noFile:{
        fontWeight:'bold',
        fontSize:16,
        width:200,
        textAlign:"center",
        marginTop:"70%"
    },
    image:{
        width:"100%",
        height:"100%",
    }
})
import React, {useState, useEffect} from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostForm({navigation}) {
    const [imageUri, setimageUri] = useState();
    const [imageName, setImageName] = useState("");
    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("");
    const [isImageSelected, setIsImageSelected] = useState(false)
    const [userId, setUserId] = useState(0)

    useEffect(() => {
      return async() => {
        await AsyncStorage.getItem('user').then(res =>{
            setUserId(res)
        })
      };
    }, [])
    const launchCam =async () => {
        const options = {
            title: 'Select Avatar',
            saveToPhotos:true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const res = response.assets[0];
                setImageName(res.fileName)
                console.log(res.fileName)
                setImage(response)
                setimageUri(res.uri)
                setIsImageSelected(true)
            }
        });
    } 
    const upload = async() => {
      await storage().ref(imageName).putFile(imageUri).then( async (res) =>{
            setimageUri(null);
            await axios({
                method:"post",
                url:"http://10.0.2.2:3000/api/Contents",
                data:{
                    userId: userId,
                    kOfContent:"photo",
                    fileName:imageName,
                    caption
                }
            }).then(() => {
                alert("Photo berhasil di upload");
                navigation.navigate("Beranda");
                
            }).catch(err => alert(err));
        }).catch(err => {
            console.log(err)
        })
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch}
        onPress={()=>launchCam()}
      >
          <View style={styles.photoFrame}>
            {imageUri ? 
                <Image source={{uri:imageUri}} style={styles.image}/>
                : <Text>Select Photo</Text>
            }
          </View>
      </TouchableOpacity>
      <TextInput 
        placeholder='Caption..'
        style={styles.caption}
        onChangeText={(e) => setCaption(e)}
      />
     
      {isImageSelected &&
        <TouchableOpacity onPress={() => upload()}>
            <Text style={styles.captureButton}>
                Upload
            </Text>
        </TouchableOpacity>
      }
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:50
    },
    touch:{
        width:"90%",
        height:"50%",
        alignItems:"center"
    },
    photoFrame: {
        backgroundColor:"#e8e6e6",
        width:"100%",
        height:"100%",
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
    captureButton: {
        padding:10,
        fontSize:12,
        backgroundColor:"orange",
        color:"white",
        textAlign:"center",
        width:150,
        borderRadius:5,
        margin:10
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:5
    },
    caption:{
        borderWidth:3,
        borderColor:"#e8e6e6",
        width:"90%",
        height:"10%",
        borderRadius:5,
        margin:30,
        padding:5
    }
})
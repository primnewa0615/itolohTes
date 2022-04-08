import React, {useState, useEffect} from 'react';
import { View, Image,Text } from 'react-native';
import storage from '@react-native-firebase/storage';

export default function ImageFb({fileName}) {
    const [imageUrl, setImageUrl] = useState(null)
    useEffect(() => {
        async function render(){
            await storage().ref(fileName)
            .getDownloadURL().then(url => {
                setImageUrl(url)
            })
        }

        render()
    }, [fileName])
  return (
    <View>
      <Image style={{height:"93%", width:"100%"}} source={{uri:imageUrl}} />
    </View>
  );
}

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text,StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { themes } from '../../Constant/theme';

export default function BuiltInBrowse({navigation}) {
  return (
    <View style={{flex:1 }}>
      <View style={{height:60, justifyContent:'flex-end'}} >
        <View style={styles.header}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image style={{height:15, width:25}} resizeMode="contain" source={require("../../Images/backArrow.png")}   />
          </TouchableOpacity>
          <Text style={styles.headerText}>Buy E-Gift Card</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text style={styles.done}>Done</Text>
          </TouchableOpacity>
        </View>
        </View>
      <WebView source={{ uri: 'https://cancopetroleum.ackroo.net/en/gifts/new' }} />
     </View>
  );
}
const styles = StyleSheet.create({

    header:{
      // backgroundColor:'green',
      marginHorizontal:'5%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingBottom:'2%'
    },
    headerText:{
color:themes.BlueColor1,
fontFamily:themes.F2_Family1,
fontSize:22,
paddingLeft:"5%"

    },
    done:{
      textAlign:'right',
      textDecorationLine:'underline',
      fontSize:16,
      color:themes.BlueColor1
    }

})
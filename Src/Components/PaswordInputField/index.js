import React,{useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, TextInput,Image } from 'react-native';
import { themes } from '../../Constant/theme';
import * as Animatable from "react-native-animatable";


const InputField = props => {
const [secure, setsecure] = useState(true)
const [show, setshow] = useState(false)

    // console.log(props);
    return <View>
        <View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.text3}>{props.title}</Text>
            <TouchableOpacity onPress={()=>setshow(!show)}>
            <Image  source={props.Icon}  style={{height:11, width:11, marginTop:14, marginLeft:10, tintColor: show ? themes.OrangeColor2 : "#929292"}}/>
            </TouchableOpacity>
            </View>
            {show ?
            <Animatable.Text animation="fadeInRightBig" style={{color:themes.OrangeColor2, fontFamily:themes.F2_Family1, paddingTop:5,textAlign:'left',fontSize:12}}>{props.title2}</Animatable.Text>
          :null}
            <View style={styles.Viewinput1}>
            <TextInput style={styles.textinput1}
              onChangeText={props.onChangeText} 
              value={props.value}
             secureTextEntry={secure}
              placeholder={props.placeholder}
               placeholderTextColor="#bcbcbc" />
                 {secure ?
                 <TouchableOpacity onPress={()=>setsecure(false)}>
                 <Image style={styles.IconImage}  resizeMode="contain" source={require("../../Images/visible.png")} />
                 </TouchableOpacity>
                 :
                 <TouchableOpacity onPress={()=>setsecure(true)}>
                 <Image style={styles.IconImage1}  resizeMode="contain" source={require("../../Images/invisible.png")} />
                 </TouchableOpacity>
                }
                </View>
        </View>
    </View>

};
const styles = StyleSheet.create({
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    Viewinput1: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        flexDirection:'row',
        borderRadius: 30,
        alignItems:'center',
    },
    textinput1: {
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '83%',
        borderRadius: 30,
        paddingHorizontal: 30
    },
    IconImage:{
        height:18, 
        width:23,
        marginLeft:10,
        // marginTop:-,
      tintColor:"#000"
    },
    IconImage1:{
      height:18, 
      width:23,
      marginLeft:10,
      tintColor:"#000"
  },
});
export default InputField

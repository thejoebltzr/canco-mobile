import React from 'react';
import { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { themes } from '../../Constant/theme';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { ResetPasswordConst } from '../../Redux/action';

export default function ResetPassword({navigation}) {
    const { loading } = useSelector(({ authRed }) => authRed)

    const [email, setemail] = useState("")
    const dispatch = useDispatch()

    const ResetPassword = () => {
    const ResetPassword = new FormData()
    const Email = email;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const EmailResult =mailformat.test(Email)
    console.log("Email format", EmailResult)

    ResetPassword.append("email",email)
    if (email == ""){
        Toast.show({
          type: 'info',
          text1: 'Alert!',
          text2: "Please enter your Registered email",
        })
        return
      }
      if(!EmailResult){
        // console.log("fail", EmailResult)
        Toast.show({
          type: 'error',
          text1: 'Alert!',
          text2: "Email is invalid",
        })
        return
      }
      dispatch(ResetPasswordConst(
        ResetPassword,
        () => {
            setemail("")
        },
        () => {
            navigation.navigate('ResendMessage')
        },
        () => {
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Invalid email",
            })
        }
    ))
    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <Pressable onPress={()=> navigation.goBack()} >
                    <Image style={styles.backArrow} source={require("../../Images/backArrow.png")} />
                </Pressable>
                <Text style={styles.heading}>Reset Password</Text>
                <Text style={styles.content}>Enter your Email Address associated with your account and
                 we’ll send a reset password link.</Text>
                <View>
                    <InputField onChangeText={text => setemail(text)} value={email} title="Email" placeholder="abc@example.com" />
                    <View style={{marginTop:10}}>
                    <BlueButton onPress={()=>ResetPassword()} loader={loading} title="Send Code"  />
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
    heading: {
        color: themes.BlueColor1,
        fontSize: 30,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
        paddingTop:40,
        lineHeight:40,
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '8%',
        textTransform:"capitalize",
        fontFamily: themes.F2_Family1,
      },
    phoneinput: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        paddingHorizontal: 30
    },
    codestyle: {
        alignSelf: 'center',
        backgroundColor: '#f3f3f3',
        textAlign: 'center',
        marginLeft: -30,
    },
    flagstyle: {
        marginLeft: "-15%"
    },
    inputnumber: {
        backgroundColor: themes.TextInputBGC,
        height: 60,
        width: "100%",
        color: '#000'
    },
    backArrow: {
        height: 15,
        width: 18,
    },
    ContinuePhone:{
        height:60,
        width:205,
        marginTop:30
    },
    content:{
        fontSize:16,
        color:'#000000',
        fontFamily:themes.F1_Family1,
        paddingTop:15,
        lineHeight:30,
        opacity:.6,
        textAlign:'auto'
    }
});

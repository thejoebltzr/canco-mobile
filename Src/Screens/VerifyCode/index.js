import React from 'react';
import { useState, useRef,useEffect } from "react";

import { View, Text, StyleSheet, Pressable, Image,TouchableOpacity } from 'react-native';
import { themes } from '../../Constant/theme';
import { useNavigation } from '@react-navigation/native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import BlueButton from '../../Components/BlueButton';
import { VerifyCodeOtp} from '../../Redux/action';

export default function VerifyCode({navigation}) {
    // const navigation = useNavigation();

    // const [numShow, setnumShow]=useState()
    // const {C_number} = route.params;
    // const VerifyCode = () =>{
    //     // if ( == ""){
    //     //   Toast.show({
    //     //       type: 'info',
    //     //       text1: 'Alert!',
    //     //       text2: "Please, enter your Number",
    //     //   })
    //     //   return
    //     // }
    //     console.log("this is otp num", C_number);
    //     const form_data = new FormData()
    //     form_data.append("phoneNumber",C_number )
    //     form_data.append("code",Code )
    
    //     dispatch(VerifyCodeOtp(
    //         form_data,
    //         ()=>{
    //         setValue("")
    //       },
    //       ()=>{
    //           navigation.navigate("Login")
    //       }
    //     ))
    // }
    

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Image style={styles.backArrow} source={require("../../Images/backArrow.png")} />
                </Pressable>
                <Text style={styles.heading}>Verify Code</Text>
                <Text style={styles.codeVerify}>Code is sent to +123 456 665</Text>
                
                <View>
                    <OTPInputView
                        style={{ width: '100%', height: 150 }}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        selectionColor="#0000"
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                </View>
                <Text style={[styles.codeVerify, styles.resendotp]}>Did'nt recieve code?</Text>
                <Pressable onpress={()=> console.log("hello")} >
                    <Text style={styles.resendotptext}>Resend OTP</Text>
                </Pressable>
                <View style={{ marginTop: 10 }}>
                    <BlueButton onPress={()=>navigation.navigate("CreateNewPassword")}  title="Verify Code" />
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
        paddingTop: 40,
        lineHeight: 40,
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '8%',
        textTransform: "capitalize",
        fontFamily: themes.F2_Family1,
    },

    backArrow: {
        height: 15,
        width: 18,
    },
    ContinuePhone: {
        height: 60,
        width: 205,
        marginTop: 30
    },
    codeVerify: {
        fontSize: 16,
        color: '#000000',
        fontFamily: themes.F1_Family1,
        paddingTop: 15
    },
    // borderStyleBase: {
    //     width: 30,
    //     height: 45
    // },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 60,
        height: 60,
        borderWidth: 0,
        borderBottomWidth: 1,
        backgroundColor: themes.TextInputBGC,
        borderRadius: 40,
        marginLeft: '5%',
        color: "#000000",
        fontSize: 20,
        fontWeight: '700'
    },

    underlineStyleHighLighted: {
        borderColor: themes.OrangeColor2,
        borderRadius: 40,
        borderWidth: 2,
        backgroundColor: '#fff',
    },
    resendotp: {
        textAlign: 'center',
        marginTop: '-10%'
    },
    resendotptext: {
        color: themes.OrangeColor2,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24,
        textAlign: "center",
        textDecorationLine: "underline"
    }


});

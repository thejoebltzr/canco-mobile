import React from 'react';
import { useState, useRef,useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../../Constant/theme';
import PhoneInput from "react-native-phone-number-input";
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyPhoneOtp } from '../../Redux/action';
import Toast from 'react-native-toast-message';

export default function ContinueWithPhone({route}) {
    
    const { RegisterFMdata } = useSelector(({ authRed }) => authRed)
    const navigation = useNavigation();
    const {code, cellNoParam,C_number} = route.params
  const [formattedValue, setFormattedValue] = useState("");
  const [value, setValue] = useState("");
  const phoneInput = useRef()
  const [codeValue, setCodeValue] = useState("")
  const dispatch = useDispatch()
  const { loading } = useSelector(({ authRed }) => authRed)
  useEffect(() => {
    console.log("user Data Verify : ", code,cellNoParam,C_number)
  }, [])

  const VerifyPhone = () =>{
      if (cellNoParam == ""){
        Toast.show({
            type: 'info',
            text1: 'Alert!',
            text2: "Please, enter your Number",
        })
        return
      }
      const form_data = new FormData()
      form_data.append("phoneNumber", C_number)
      dispatch(VerifyPhoneOtp(
          form_data,
          ()=>{
          setValue("")
        },
        ()=>{
            navigation.navigate("VerifyPhone",{C_number:C_number})
        }
      ))
  }
  

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Image style={styles.backArrow} source={require("../../Images/backArrow.png")} />
                </Pressable>
                <Text style={styles.heading}>Continue With{"\n"}Phone</Text>
                <Text style={styles.codeVerify}>You'll recieve 4 digit code to verify{"\n"}next.</Text>
                <View>
                    <Text style={styles.text3}>Phone Number</Text>
                    {console.log("number :", 
                    )}
                    
                    <View style={{}}>
                        <PhoneInput
                            textInputStyle={styles.inputnumber}
                            containerStyle={styles.phoneinput}
                            disableArrowIcon="true"
                            flagButtonStyle={styles.flagstyle}
                            textContainerStyle={{ backgroundColor: "#f3f3f3" }}
                            codeTextStyle={styles.codestyle}
                            ref={phoneInput}
                            defaultCode={code}
                            defaultValue={cellNoParam}               
                            placeholder="123-555-2514"
                            style={{}}
                            disabled={true}
                            // placeholderTextColor="red"
                            textInputProps={{
                                placeholderTextColor: "#929292",
                                editable: false
                            }}
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            
                            
                        />
                    </View>
                    <View style={{marginTop:10}}>
                    <BlueButton 
                    onPress=
                    {()=>VerifyPhone()}
                    // {navigation.navigate("ContinueWithPhone")}
                    loader={loading}
                     title="Continue"  />
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
        // color: 'red',
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
        color:"#929292"
    },
    flagstyle: {
        marginLeft: "-15%"
    },
    inputnumber: {
        backgroundColor: themes.TextInputBGC,
        height: 60,
        width: "100%",
        // color: 'red'
        color:"#929292"


    },
    backArrow: {
        height: 15,
        width: 18,
        // backgroundColor:'red'
    },
    ContinuePhone:{
        height:60,
        width:205,
        marginTop:30
    },
    codeVerify:{
        fontSize:16,
        color:'#000000',
        fontFamily:themes.F1_Family1,
        paddingTop:15
    }


});

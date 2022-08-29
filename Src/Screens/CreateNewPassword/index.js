import React from 'react';
import { useState, useRef } from "react";

import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
import InputField from '../../Components/PaswordInputField';
import * as Animatable from "react-native-animatable";



export default function CreateNewPassword({navigation}) {
    // const [value, setValue] = useState("");
    // const phoneInput = useRef()
    
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
            <View style={styles.container}>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Image style={styles.backArrow} source={require("../../Images/backArrow.png")} />
                </Pressable>
                <Animatable.Text 
                  animation="fadeInUp"
                style={styles.heading}>Create New{"\n"}Password</Animatable.Text>
                <Text style={styles.passwordContent}>Your password must be different from previous used password.{"\n"}next.</Text>
            <InputField title="Password"  />
            <Text style={styles.passwordContent}>Must be atleast 8 character</Text>
            <View style={{marginTop:10}}>
            <InputField title="Confiorm Password"  />
            </View>
                <View>
                    {/* <Text style={styles.text3}>Phone Number</Text> */}
                    <View style={{marginTop:10}}>
                    <BlueButton onPress={()=> navigation.navigate("DashboardStorePromotion")} title="Continue"  />
                    </View>
                </View>
            </View>
            </ScrollView>
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
    },
    flagstyle: {
        marginLeft: "-15%"
    },
    inputnumber: {
        backgroundColor: themes.TextInputBGC,
        height: 60,
        width: "100%",
        color: 'red'
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
    passwordContent:{
        fontSize:16,
        color:'#000000',
        fontFamily:themes.F2_Family1,
        paddingTop:10,
        lineHeight:20
    }


});

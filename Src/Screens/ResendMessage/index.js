import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';

export default function ResendMessage({ navigation }) {
    const { loading } = useSelector(({ authRed }) => authRed)
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/TransferSuccessfuly.png")}>
                <Image resizeMode="contain" style={{ width: 189, height: 162 }} source={require("../../Images/messagetick.png")} />
                <Text style={styles.title1}>Your reset password link has been sent to your email.</Text>
                <View style={{ width: '80%', marginTop: '15%' }}>
                    <BlueButton loader={loading} onPress={() => navigation.navigate("Login")} title="Back To Login" />
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    title1: {
        color: "#303030",
        fontFamily: themes.F2_Family2,
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 35,
        paddingTop: '8%',
        width:'90%'
    },
   
})
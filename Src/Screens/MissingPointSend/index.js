import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';

export default function componentName({ navigation }) {
    const { loading } = useSelector(({ authRed }) => authRed)
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/TransferSuccessfuly.png")}>
                <Image resizeMode="contain" style={{ width: 189, height: 162 }} source={require("../../Images/messagetick.png")} />
                <Text style={styles.title1}>Your request has{"\n"} been submitted</Text>
                <Text style={styles.title2}>Dear user, kindly expect our team to {"\n"} get back to you asap</Text>
                <View style={{ width: '80%', marginTop: '15%' }}>
                    <BlueButton loader={loading} onPress={() => navigation.navigate("DashboardStorePromotion")} title="Back To Dashboard" />
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
        paddingTop: '8%'
    },
    title2: {
        fontSize: 15,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        lineHeight: 25,
        paddingTop: '8%'
    }

})
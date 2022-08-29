import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
export default function AddCardSuccess({ navigation }) {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/TransferSuccessfuly.png")}>
            <View style={{ flex: 1 }}></View>
                <Image resizeMode="contain" style={{ width: 197, height: 197 }} source={require("../../Images/OrangeTickMark.png")} />

                <View style={{ flex: 2}}>
                    <Text style={styles.title1}>Canco Card Added
                        Successfully
                    </Text>
                </View>


                <View style={{ width: '80%',flex: 1 }}>
                    <BlueButton loader={false} onPress={() => navigation.navigate("CancoCardWallet")} title="Continue" />
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


    },


})
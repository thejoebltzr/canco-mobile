import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_CARD_INDEX } from '../../Redux/constant';


export default function TransferFundsSuccess({ navigation }) {
    const { loading, TransferBalance } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("transfer funds data", TransferBalance)
        // dispatch({ type: SELECTED_CARD_INDEX, data: 0 })
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/TransferSuccessfuly.png")}>
                <Image resizeMode="contain" style={{ width: 197, height: 197 }} source={require("../../Images/OrangeTickMark.png")} />
                <Text style={styles.title1}>Transferred{"\n"} Successfully</Text>
                <Text style={styles.text2}>Dear user, the funds have been {"\n"} transferred to your requested card.</Text>
                <View style={{ width: '80%', marginTop: '15%' }}>
                    <BlueButton loader={loading} onPress={() => navigation.navigate("DashboardStorePromotion")} title="Continue" />
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
        paddingTop: '3%',
        width: '90%'
    },
    text2: {
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontSize: 15,
        paddingTop: '5%',

        // textAlignVertical:'top'

    }

})
import React, { useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PasswordInputField from '../../Components/PaswordInputField';
import { themes } from '../../Constant/theme';
import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useDispatch, useSelector } from 'react-redux';
import { RegisterFormDataConst, IS_LOADING, COUNTRY } from '../../Redux/constant';
import BlueButton from '../../Components/BlueButton';
import {UpdatePasswordAC} from '../../Redux/action'


export default function ChangePassword({ navigation }) {
    const [password, setpassword] = useState("")
    const [newPassword, setnewPassword] = useState("")

    const dispatch = useDispatch()
    const { loading, token, myCards } = useSelector(({ authRed }) => authRed)
    useEffect(() => {
        console.log("card num ",myCards)
    }, [])

    const UpdatePassword = () => {
        const updatePass = new FormData()
        updatePass.append("password", password)
        updatePass.append("new_password", newPassword)

        if(myCards.length > 0)
            updatePass.append("cardNumber", myCards[0].cardnumber)

        const PassWord = newPassword;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        const passResult = strongRegex.test(PassWord)
        // console.log("this is password rule", passResult)
        if (newPassword == "" || newPassword.length <= 7) {
            Toast.show({
                type: 'info',
                text1: 'Alert!',
                text2: "Password must be 8 character long and unique",
            })
            return
        }
        if (!passResult) {
            // console.log("fail", passResult)
            Toast.show({
                type: 'error',
                text1: 'Alert!',
                text2: "Password rules voilation",
            })
            return
        }
        dispatch(UpdatePasswordAC(
            updatePass,
            token,
            ()=>{
                navigation.navigate("DashboardStorePromotion")
            },
            // Toast.show({
            //     type: 'info',
            //     text1: 'Alert!',
            //     text2: "Updated Successfully",
            //   })

        ))

    }

    useEffect(() => {
        dispatch({ type: IS_LOADING, isloading: false })
    }, [])
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center"}} >
                        <Image style={{ height: 15, width: 20, tintColor: '#000' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Change password</Text>
                </View>
                <PasswordInputField value={password} onChangeText={(text) => setpassword(text)}
                    title="Password" placeholder="*********" />
                <PasswordInputField Icon={require("../../Images/infoIcon.png")} value={newPassword} onChangeText={(text) => setnewPassword(text)}
                    title="New password" placeholder="*********" title2="Password must contain atleast one upperCase, One Lower case, One digit." />
                <BlueButton loader={loading} title="Update password" onPress={() => UpdatePassword()} />

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
   
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "4%",
        paddingTop:"1%"
    },


});


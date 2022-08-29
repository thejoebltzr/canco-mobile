import React from 'react';
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import { themes } from '../../Constant/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import { ResendOTP, VerifyCodeOtp, VerifyPhoneOtp } from '../../Redux/action';


export default function VerifyPhone({ route }) {
    const { RegisterFMdata } = useSelector(({ authRed }) => authRed)

    useEffect(() => {
        console.log("user Data Verify : ", RegisterFMdata)
    }, [])

    const navigation = useNavigation();
    const [numShow, setnumShow] = useState()
    const [enter_Code, setenter_Code] = useState()
    const dispatch = useDispatch()
    const { C_number } = route.params
    const { loading } = useSelector(({ authRed }) => authRed)
    const [showRegistrationErrorModal, setShowRegistrationErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const VerifyCode = () => {
        const form_data = new FormData()
        form_data.append("phoneNumber", C_number)
        form_data.append("code", enter_Code)

        dispatch(VerifyCodeOtp(
            form_data,
            () => {
                setenter_Code("")
            },
            () => {
                //   navigation.popToTop("Login")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'CheckEmail' }],
                });
            },
            (errMsg) => {
                console.log("errMSG", errMsg)
                //   navigation.popToTop("Login")
                if (errMsg == 'EmailTaken' || errMsg == 'This email is already in use') {
                    setErrorMsg('Email is already taken.')

                    setShowRegistrationErrorModal(true);
                } else {
                    setErrorMsg(errMsg);
                }

              



                //   fname,lname,Emaill,picture
            },
            RegisterFMdata
        ))
    }

    async function resendOTP(){
        const form_data = new FormData()
        form_data.append("phoneNumber", C_number)
        try{
            const response = await ResendOTP(form_data);
            console.log("Response",response)
        }catch(err){
            console.log("error",err)
        }
    }

    // console.log("oyp num", C_number)
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>

            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image style={styles.backArrow} source={require("../../Images/backArrow.png")} />
                </Pressable>

                <Text style={styles.heading}>Verify Phone</Text>
                <Text style={styles.codeVerify}>Code is sent {C_number}</Text>
                <View>
                    <OTPInputView
                        style={{ width: '100%', height: 150 }}
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        selectionColor="#0000"

                        onCodeFilled={(code => { setenter_Code(code) })}
                    />
                </View>
                <Text style={[styles.codeVerify, styles.resendotp]}>Didn't receive code?</Text>
                <TouchableOpacity onPress={() => {
                    console.log("Resend OTP")
                    resendOTP();
                }}   >
                    <Text style={styles.resendotptext}>Resend OTP</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <BlueButton loader={loading} onPress={() => VerifyCode()} title="Verify Account" />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showRegistrationErrorModal}
                    onRequestClose={() => {
                        setShowRegistrationErrorModal(!showRegistrationErrorModal);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Registration Failed</Text>
                            <Text style={styles.modalContent}>{errorMsg}</Text>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    setShowRegistrationErrorModal(!showRegistrationErrorModal)
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'RegisterScreen', params: { fname: '', lname: '', Email: '', picture: '' } }],
                                    });
                                }} style={styles.modalBtn}>
                                    <Text style={styles.modalBtnText}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

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
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    }, modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "75%",
        padding: 25,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 13
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12
    },
    modalContent: {

        marginBottom: 16,
        fontSize: 16,

    },
    modalBtn: {
        // alignItems: 'center',
        backgroundColor: 'red',
        width: '60%',
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 14,


    },
    modalBtnText: {
        color: '#ffffff'
    }


});

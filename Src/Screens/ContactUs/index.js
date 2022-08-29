import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import { IS_LOADING } from '../../Redux/constant';
import {ContactUsMess} from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function ContactUs({ navigation }) {
    useEffect(() => {
        dispatch({type:IS_LOADING, isloading:false})

    }, [])
    const { loading,token, currentUser } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()

    const[name, setname]=useState("")
    const[message, setmessage]=useState("")
    const[email, setemail]=useState("")
    const ContactUsForm =()=>{
        const ContactUsForm = new FormData()
        ContactUsForm.append("name", name)
        ContactUsForm.append("email", email)
        ContactUsForm.append("message", message)
        ContactUsForm.append("senderEmail", currentUser.email)

        if (name == "") {
            Toast.show({
              type: 'error',
              text2: "Please enter your name",
            })
            return
          }
          if (email == "") {
            Toast.show({
              type: 'error',
              text2: "Please enter your email",
            })
            return
          }
          if (message == "") {
            Toast.show({
              type: 'error',
              text2: "Please enter your message",
            })
            return
          }
    
          dispatch(ContactUsMess(
            ContactUsForm,
            ()=>{
                setname("")
                setmessage("")
                setemail("")

            },
            token,
            ()=>{
                navigation.navigate("DashboardStorePromotion")
            },
         ))
    
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.head}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
                                <Image resizeMode="contain" style={{ height: 18, width: 15, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Contact Us</Text>
                        </View>
                        <Text style={styles.subHeading}>Leave us a message, we will get contact with you as soon as possible.</Text>
                        <View>
                            <InputField onChangeText={text => setname(text)} value={name} title="Your Name" placeholder="Your Name" />
                            <InputField onChangeText={text => setemail(text)} value={email} title="Email" placeholder="exampe@email.com" />
                            <Text style={styles.text}>Message</Text>
                            <TextInput
                            onChangeText={text => setmessage(text)} value={message}
                                multiline={true}
                                numberOfLines={5}
                                style={styles.textContainer}
                                placeholder={'What do you want to tell us about?'}
                                placeholderTextColor="gray"
                                color="#000000"
                            />
                        </View>
                    </View>
                    <BlueButton loader={loading} onPress={()=>ContactUsForm()} title="Send" />
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 45
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "6%"
    },
    text: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    subHeading: {
        color: "#000",
        fontFamily: themes.F2_Family1,
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: "10%"
    },
    textContainer: {
        height: 180,
        paddingLeft: 20,
        paddingTop:20,
        fontSize: 16,
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        // lineHeight: 2,
        width: '100%',
        borderRadius: 30,
        // paddingHorizontal: 30,
        opacity:.6,
        textAlignVertical:"top"
    }

})

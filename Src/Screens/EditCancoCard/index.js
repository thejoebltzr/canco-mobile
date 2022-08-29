import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { themes } from '../../Constant/theme';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import  {IS_LOADING}  from '../../Redux/constant';
import Toast from 'react-native-toast-message';



export default function EditCancoCard({ navigation , route}) {
    const dispatch = useDispatch()
    const {cardnumber} = route.params;
    const [card_Number, setcard_Number]= useState(cardnumber)
    const [accessCode, setaccessCode]= useState("")
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    

    console.log("ROUTE PARAMS: ", route.params)
    useEffect(() => {
        dispatch({type:IS_LOADING, isloading:false})
    }, [])

    const EditCard = () => {
        const data = new FormData()
        data.append("cardNumber", card_Number)
        data.append("email", currentUser.email)
        data.append("accessCode", accessCode)

        if (card_Number == "") {
            Toast.show({
            type: 'error',
            text1: 'Alert!',
            text2: "Please enter your card number",
            })
            return
        }

        dispatch(EditCardƒCanco(data, token, () => {
            console.log('cards to push' , global.cardNumbers.length)
            if(!global.cardNumbers.includes(card_Number))
                global.cardNumbers.push(card_Number)
            console.log('cards after pushing' , global.cardNumbers.length)
    
            Toast.show({
                type: 'success',
                text2: "Card added successfuly",
            })
            
            setcard_Number("")
            navigation.popToTop()
        }))
    }

     
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
           
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"space-between" }}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: '-5%' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading1}>Edit Your Card</Text>
                        </View>
                        </View>
                       
                    </View>
                    <Image  style={{height:185, width:295, marginTop:'10%',alignSelf:"center", borderRadius: 50 }} resizeMode="contain"  source={require("../../Images/canco_card.png")} />
                    <View style={{marginTop:'5%'}}>
                        <Text style={styles.text3}>Your Card Number</Text>
                        <View style={styles.flagView}>
                            <Image style={{ height: 24, width: 29, marginLeft: '5%' }} source={require("../../Images/cancoIcon1.png")} />
                            <TextInput onChangeText={text => setcard_Number(text)} value={card_Number} placeholder="xxxxxx xxxx xxxx 7571" keyboardType="phone-pad" placeholderTextColor="gray" style={styles.input} />
                        </View>
                        <InputField title="Access Code (optional)" placeholder="0000" keyboardType="numeric" onChangeText={text => setaccessCode(text)} />
                        <View style={{ marginTop: '12%' }}>
                            <BlueButton onPress={()=> EditCard()} loader={loading} title="Edit Card" />
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
    heading1: {
        fontSize: 22,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
        paddingLeft:'2%'
    },
    headingContainer: {
        marginLeft: '7%'
    },
  
    flagView: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '85%',
        borderRadius: 30,
        paddingHorizontal: 10
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    }
})
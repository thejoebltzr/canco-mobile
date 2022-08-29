import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Keyboard, Modal } from 'react-native';
import { themes } from '../../Constant/theme';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_CARD, IS_LOADING, MY_CARDS, SELECTED_CARD_INDEX } from '../../Redux/constant';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { DeactivateAndRemoveCard, RemoveCancoCard, RemoveDefaultCard, TransferFundBalance } from '../../Redux/action/index'
import Autocomplete from 'react-native-autocomplete-input';
import DropDownPicker from 'react-native-dropdown-picker';
import BarcodeScanner from '../../Components/Scanner';

export default function TransferFunds({ navigation }) {

    const { loading, token, myCards, currentUser } = useSelector(({ authRed }) => authRed)

    const [deactivateSourceCard, setDeactivateSourceCard] = useState(false);
    const dispatch = useDispatch()
    const [ackroo_id_src, setackroo_id_src] = useState("")
    const [numbr, setnumber] = useState("0")
    const [openFrom, setOpenFrom] = useState(false);
    const [valueFrom, setValueFrom] = useState(null);
    const [dataFrom, setDataFrom] = useState([])
    const [openTo, setOpenTo] = useState(false);
    const [valueTo, setValueTo] = useState(null);
    const [isScannerModalVisible, setScannerModalVisible] = useState(false);
    useEffect(() => {
        dispatch({ type: IS_LOADING, isloading: false })

        var data = [];
        myCards?.forEach(element => {
            data.push({
                label: element.cardnumber,
                value: element.cardnumber
            })
        });
        setDataFrom(data)
    }, [])

    const transferFunds = async () => {
        const data = new FormData()
        data.append("accessCode", ackroo_id_src)
        data.append("toCardNumber", valueTo)
        data.append("fromCardNumber", valueFrom)
        data.append("deactivateSourceCardnumber", deactivateSourceCard ? valueFrom : 0)

        
        if (!valueFrom) {
            Toast.show({
                type: 'error',
                text2: "Please enter a source card number",
            })
            return
        }
        if (!valueTo) {
            Toast.show({
                type: 'error',
                text2: "Please enter a destination card number",
            })
            return
        }
        if (valueTo == valueFrom) {
            Toast.show({
                type: 'error',
                text2: "Please select a different destination card",
            })
            return
        }
        if (ackroo_id_src == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter the access code",
            })
            return
        }

        dispatch(TransferFundBalance(
            data,
            () => {
                setValueFrom("")
                setValueTo("")
                setackroo_id_src("")
            },
            token,
            async () => {
                if (deactivateSourceCard) {
                  
                    const deactivateRes = await DeactivateAndRemoveCard(valueFrom, token);

                    removeDeactivatedCardFromAccount();

                    removeDefaultCard();
                    
                    console.log("Response", deactivateRes)
                }

                dispatch({ type: MY_CARDS, data: [] })

                navigation.navigate("TransferFundsSuccess")
            })
        )

    }

    const checkedStatus = () => {

        setDeactivateSourceCard(!deactivateSourceCard)
        if (numbr == '0') {
            setnumber('1')
        }
        else {
            setnumber('0')
        }
    }

    const removeDeactivatedCardFromAccount = () => {
        const cardIdToBeRemoved = valueFrom;
       
        const index = myCards.findIndex((card) => card.cardnumber == cardIdToBeRemoved);
        
        if (index > -1) {
            let cards = myCards
            cards.splice(index, 1);
            global.cardNumbers = cards.map((c) => c.cardnumber);
            dispatch({ type: MY_CARDS, data: cards })
        }

    }

    //Remove Default Card
    const removeDefaultCard = async () => {
        var data = new FormData();
        data.append("email", currentUser.email);
        const res = await RemoveDefaultCard(data, token);
         if (res.Status == 200) {
            dispatch({type: DEFAULT_CARD,data: null})
        } 
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} >

     
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <BarcodeScanner isVisible={isScannerModalVisible} closeModal={() => { setScannerModalVisible(false) }} onBarCodeRead={(code) => {
                setValueTo(code);
            }} />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                        <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: 2 }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>Transfer Funds</Text>
                    <TouchableOpacity onPress={() => setScannerModalVisible(true)}>
                        <Image style={{ height: 25, width: 27, tintColor: themes.BlueColor1, marginTop: 7 }} resizeMode="contain" source={require("../../Images/QrCode.png")} />
                    </TouchableOpacity>
                </View>


                <>

                    {/* <View> */}
                    <Text style={styles.text3}>Source Card Number</Text>
                    <DropDownPicker
                        placeholder={"Select a card"}
                        open={openFrom}
                        value={valueFrom}
                        items={dataFrom}
                        setOpen={setOpenFrom}
                        setValue={setValueFrom}
                        style={{ backgroundColor: themes.TextInputBGC, borderWidth: 0, marginBottom: 16 }}
                    />

                    <InputField onChangeText={(text) => setackroo_id_src(text)} value={ackroo_id_src} title="Access Code" placeholder="3674" keyboardType="phone-pad" />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.checkbox}>

                            <CheckBox
                                checkedIcon={<Image source={require('../../Images/Wcheck.png')} style={styles.checkimg} resizeMode="contain" />}
                                uncheckedIcon={<Image source={require('../../Images/unchecked.png')} style={styles.checkimg} />}
                                checked={deactivateSourceCard}
                                onPress={() => checkedStatus()} />

                        </View>
                        <Text style={{ fontSize: 14, fontFamily: themes.F2_Family1, color: "#000", letterSpacing: .5, opacity: .5, paddingLeft: '3%' }}>Deactivate source card?</Text>

                    </View>
                    <Text style={{ fontFamily: themes.F1_Family2, fontSize: 22, textAlign: 'center', marginTop: '5%' }}>
                        TO
                    </Text>
                    {/* <Text style={styles.text3}>Destination Card Number</Text> */}
                    {/* <InputField onChangeText={(text) => setValueTo(text)} value={valueTo} title="Card Number" placeholder="xxxxxx xxxx xxxx 7551" keyboardType="phone-pad" /> */}

                    <DropDownPicker
                        open={openTo}
                        value={valueTo}
                        items={dataFrom}
                        setOpen={setOpenTo}

                        setValue={setValueTo}
                        // dropDownContainerStyle={{position:'absolute'}}
                        // containerStyle={{flex:1, display:'flex',bottom:120}}
                        placeholder={"Select a card"}
                        style={{ backgroundColor: themes.TextInputBGC, borderWidth: 0, marginTop:16}}
                    />
                    <View style={{ marginTop: '12%' }}>
                        <BlueButton loader={loading} onPress={() => transferFunds()} title="Transfer" />
                    </View>

                    {/* </View> */}
                </>

            </View>

        </View>
           </ScrollView>
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
        paddingRight: '22%'
    },
    headingContainer: {
        marginLeft: '7%'
    },
    missingPoint: {
        fontSize: 12,
        color: "#000",
        fontFamily: themes.F2_Family1,
        paddingTop: '1%'
    },
    flagView: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 1,
        //   borderWidth:2
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
        marginBottom: 5
    },
    checkbox: {
        height: 22,
        width: 22,
        backgroundColor: "#69C200",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    checkimg: {
        height: 17,
        width: 17,
        marginLeft: -8,
    },
    cheboxContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        marginVertical: 15
    },

})
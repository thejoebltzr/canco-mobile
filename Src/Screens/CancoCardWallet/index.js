import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, StyleSheet, Image, Pressable, ScrollView, Alert, Modal, TouchableOpacityBase, Platform } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import { DeactivateAndRemoveCard, GetDefaultCard, RemoveCancoCard, SetDefaultCard } from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { DEFAULT_CARD, IS_LOADING, MY_CARDS, SELECTED_CARD_INDEX } from '../../Redux/constant';
import { CheckBox } from 'react-native-elements';
import WalletManager from 'react-native-wallet-manager';


var rs = require('jsrsasign');
import { WALLET_CARD_CLASS_ID, ISSUER_ID } from '@env'
import { generateAuthJWT, generateJWTFromCardObject } from '../../Utility/Utils';
import BlueButton from '../../Components/BlueButton';

import { GooglePay } from 'react-native-google-pay';
import { APPLE_WALLET_PASS_URL, GOOGLE_WALLET_OBJECTS_API_URL } from '../../BASE_URL';


export default function CancoCardWallet({ navigation, route }) {
    const [screen, setscreen] = useState(0)
    const { myCards, token, loading, selectedCardIndex, currentUser, defaultCard } = useSelector(({ authRed }) => authRed)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState()
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [walletType, setWalletType] = useState('');
    const [cardDetails, setCardDetails] = useState();
    const [googleAccessToken, setGoogleAccessToken] = useState();
    const scrollRef = useRef();
    const [otherCards, setOtherCards] = useState([]);

    const markAsDefault = async (cardnumber, index) => {
        setIsChecked(true);

        var data = new FormData();
        data.append("email", currentUser.email);
        data.append("cardNumber", cardnumber);

        dispatch({ type: DEFAULT_CARD, data: otherCards[index] })
        console.log("Index",index)
        const cardIndex = myCards.findIndex((item) => item.cardnumber == cardnumber); 
        dispatch({ type: SELECTED_CARD_INDEX, data: cardIndex })
        const res = await SetDefaultCard(data, token);
       
        // if (res.Status == 200) {

            cards = myCards.filter((item) => item.cardnumber != cardnumber);
           
            setOtherCards(cards);

            scrollRef.current?.scrollTo({
                y: 0,
                animated: true
            });
            Toast.show({
                type: 'success',
                text2: "Marked Card as Default",
            })
            setIsChecked(false);

        // }
    }

    useEffect(() => {
        getOtherCards();
        if (Platform.OS == "android") {
            getAccessTokenFromGoogle();
        }

    }, [])

    const getOtherCards = () => {
        let cards = [];
        if (defaultCard) {
            cards = myCards.filter((item) => item.cardnumber != defaultCard.cardnumber);
        } else {
            cards = myCards;
        }

        setOtherCards(cards);

        console.log("Other Cards!", otherCards);
    }

    const addCardToGoogleWallet = () => {
        dispatch({ type: IS_LOADING, isloading: true })
        insertCard();
    }

    const addCardToAppleWallet = async () => {
        dispatch({ type: IS_LOADING, isloading: true })

        const balance = cardDetails.gift != "null" ? parseFloat(cardDetails.gift) : 0.0;

        // const balance = parseFloat(cardDetails?.gift) + parseFloat(cardDetails?.loyalty) + parseFloat(cardDetails?.promo)

        console.log("cash balance",balance)


        const passGeneratorUrl = `${APPLE_WALLET_PASS_URL}?cardNumber=${cardDetails.cardnumber}&balance=${balance}`;

        console.log("add to apple wallet", passGeneratorUrl)
        try {

            const result = await WalletManager.addPassFromUrl(
                passGeneratorUrl
            );

            dispatch({ type: IS_LOADING, isloading: false })
            setModalVisible(false)


            if (result) {
                navigation.navigate("AddCardSuccess");
            }

        } catch (e) {
            console.log(e);
        }

    }

    const showAddCardModal = () => {
        const walletType = Platform.OS == 'android' ? 'Google Wallet' : 'Apple Wallet';
        setWalletType(walletType);
        setModalVisible(true);
    }

    const getAccessTokenFromGoogle = async () => {

        var formdata = new FormData();
        formdata.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
        formdata.append("assertion", generateAuthJWT());

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://oauth2.googleapis.com/token", requestOptions)
            .then(response => response.json())
            .then(result => setGoogleAccessToken(result.access_token))
            .catch(error => console.log('error', error));

        console.log('get token')
    }

    const insertCard = async () => {
        const _token = googleAccessToken;


        console.log("Access token",_token);
        const giftBalance = cardDetails.gift != "null" ? parseFloat(cardDetails.gift) * 1000000 : 0.0 * 1000000;
        const cardData = {
            "kind": "walletobjects#giftCardObject",
            "cardNumber": cardDetails.cardnumber,
            "balance": {
                "kind": "walletobjects#money",
                "micros": `${giftBalance}`,
                "currencyCode": "CAD"
            },
            "eventNumber": "",
            "id": `${ISSUER_ID}.${cardDetails.cardnumber}`,
            "classId": WALLET_CARD_CLASS_ID,
            "version": "1",
            "state": "active",
            "barcode": {
                "kind": "walletobjects#barcode",
                "type": "code_128",

                "value": cardDetails.cardnumber,
                "alternateText": cardDetails.cardnumber
            },
            "hasUsers": true,
            "hasLinkedDevice": true,
            "disableExpirationNotification": true,
        }

        const res = await fetch(GOOGLE_WALLET_OBJECTS_API_URL, {
            method: "POST",
            body: JSON.stringify(cardData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${_token}`
            }
        });

        const data = await res.json();

        console.log("data",data)

        let giftObjectId = data.id;

        //Update the card if it already exisits on wallet objects api    
        if (!data.id) {
            const updateRes = await fetch(`${GOOGLE_WALLET_OBJECTS_API_URL}/${cardData.id}`, {
                method: "PATCH",
                body: JSON.stringify(cardData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${_token}`
                }
            });

            const updatedData = await updateRes.json();
            giftObjectId = updatedData.id;
        }

        if (giftObjectId) {
            dispatch({ type: IS_LOADING, isloading: false })
            setModalVisible(false);
            const jwtFromResult = generateJWTFromCardObject(giftObjectId);
            const saveToWalletLink = `https://pay.google.com/gp/v/save/${jwtFromResult}`;
            console.log(saveToWalletLink, 'link wallet');

            try {
                const result = await WalletManager.addPassFromUrl(
                    saveToWalletLink
                );
                console.log(result);
                navigation.navigate("AddCardSuccess");
            } catch (e) {
                console.log(e);
            }
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                            <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: 2 }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading1}>My Card and Wallet</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("AddCancoCard")} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                            <Image style={{ marginLeft: '3%', marginTop: 6, height: 44, width: 44, }} resizeMode="contain" source={require("../../Images/addBtn.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView ref={scrollRef}>
                    <View>
                        <View>
                            <View style={styles.cardsContainer}>
                                {
                                    defaultCard ? <View>
                                        <View style={styles.divider} />
                                        <Text style={styles.cardsLabelText}>Default Card</Text>
                                        <View>
                                            <ImageBackground style={{ height: 200, marginTop: 1, }} imageStyle={{ borderRadius: 50 }} resizeMode="contain" source={require("../../Images/canco_card.png")}></ImageBackground>
                                            <Text style={[styles.cardNum, styles.defaultCard]}>{defaultCard.cardnumber}</Text>
                                        </View>
                                        {
                                            Platform.OS == "android" ?
                                                <TouchableOpacity onPress={() => {
                                                    setCardDetails(defaultCard)
                                                    showAddCardModal()

                                                }}>
                                                    <View style={styles.addWalletBtn}>
                                                        <Image style={{ width: 27, height: 25, }} resizeMode="contain" source={require("../../Images/google2.png")} />
                                                        <Text style={{ marginLeft: 12 }}>Add to Google Wallet</Text>
                                                    </View>
                                                </TouchableOpacity> : null
                                        }
                                        {
                                            Platform.OS == "ios" ?
                                                <TouchableOpacity onPress={() => {
                                                    setCardDetails(myCards[selectedCardIndex])
                                                    showAddCardModal()
                                                }}>
                                                    <View style={styles.addWalletBtn}>
                                                        <Image style={{ width: 27, height: 25, }} resizeMode="contain" source={require("../../Images/apple2.png")} />
                                                        <Text style={{ marginLeft: 12 }}>Add to Apple Wallet</Text>
                                                    </View>
                                                </TouchableOpacity> : null
                                        }
                                    </View> : null
                                }


                                {
                                    otherCards.length > 0 ? <View>

                                        <View style={styles.divider} />

                                        <Text style={styles.cardsLabelText}>Other Cards </Text>
                                        {
                                            otherCards.map((item, i) => (

                                                <View key={i} >
                                                    <ImageBackground style={{ height: 200, marginTop: 1, }} imageStyle={{ borderRadius: 50 }} resizeMode="contain" source={require("../../Images/canco_card.png")}></ImageBackground>
                                                    <Text style={styles.cardNum}>{item?.cardnumber}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                        <View style={styles.checkbox}>
                                                            <CheckBox
                                                                checkedIcon={<Image source={require('../../Images/Wcheck.png')} style={styles.checkimg} resizeMode="contain" />}
                                                                uncheckedIcon={<Image source={require('../../Images/unchecked.png')} style={styles.checkimg} />}
                                                                checked={isChecked}
                                                                onPress={() => markAsDefault(item?.cardnumber, i)} />
                                                        </View>
                                                        <Text style={styles.markDefaultText}> Mark as Default</Text>
                                                    </View>
                                                    {
                                                        Platform.OS == "android" ?
                                                            <TouchableOpacity onPress={() => {
                                                                setCardDetails(item)
                                                                showAddCardModal()
                                                            }}>
                                                                <View style={styles.addWalletBtn}>
                                                                    <Image style={{ width: 27, height: 25, }} resizeMode="contain" source={require("../../Images/google2.png")} />
                                                                    <Text style={{ marginLeft: 12 }}>Add to Google Wallet</Text>
                                                                </View>
                                                            </TouchableOpacity> : null
                                                    }
                                                    {
                                                        Platform.OS == "ios" ?
                                                            <TouchableOpacity onPress={() => {
                                                                setCardDetails(item)
                                                                showAddCardModal()
                                                            }}>
                                                                <View style={styles.addWalletBtn}>
                                                                    <Image style={{ width: 27, height: 25, }} resizeMode="contain" source={require("../../Images/apple2.png")} />
                                                                    <Text style={{ marginLeft: 12 }}>Add to Apple Wallet</Text>
                                                                </View>
                                                            </TouchableOpacity> : null
                                                    }

                                                </View>
                                            ))
                                        }
                                    </View> : null
                                }

                            </View>

                            <View />
                        </View>
                    </View>
                    <View style={{ height: 80 }} />
                </ScrollView>
            </View>

            {/* Add Card to Wallet Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            Platform.OS == "android" ?
                                <Image source={require("../../Images/google2.png")} style={styles.googleWalletLogo} /> : <Image source={require("../../Images/apple2.png")} style={styles.appleWalletLogo} />
                        }

                        <Text style={styles.addToWalletModalTitle}>Add to {walletType}</Text>
                        <Text style={styles.addToWalletModalSubtitle}>Are you sure you want to add Canco Card to your
                            {""} {walletType} ? </Text>
                        <View style={{ flexDirection: "column", justifyContent: "space-between", alignSelf: "flex-end", width: "100%" }}>
                            <BlueButton loader={loading} onPress={() => {

                                if (Platform.OS == "android") {
                                    addCardToGoogleWallet();
                                } else {

                                    addCardToAppleWallet();
                                }
                            }} title="Add Card" />

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelAddCardBtn}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <View style={{ position: 'absolute', bottom: -2, width: '100%' }}>
                <BottomTab
                    usecolor1={themes.BlueColor1}
                    usecolor2={themes.BlueColor1}
                    usecolor3={themes.BlueColor1}
                    usecolor4={themes.BlueColor1}
                    Img1={require("../../Images/Home.png")}
                    Img2={require("../../Images/Location.png")}
                    Img3={require("../../Images/Promotion.png")}
                    Img4={require("../../Images/More.png")}
                    opc1={.4}
                    opc2={.4}
                    opc3={.4}
                    opc4={.4}
                />
            </View>
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
    },
    headingContainer: {
        marginLeft: '7%',
        flex: 1
    },

    payMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '93%',
        alignSelf: 'center',
        marginTop: 15
    },
    cardNum: {
        fontSize: 16,
        color: '#000000',
        opacity: 0.4,
        letterSpacing: 0.5,
        marginTop: 8,
        fontFamily: themes.F2_Family1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    CancelButton: {
        backgroundColor: themes.BlueColor1,
        height: 40,
        width: 65,
        borderRadius: 15,
        justifyContent: "center",
    },
    okButton: {
        backgroundColor: themes.OrangeColor2,
        height: 40,
        width: 60,
        borderRadius: 15,
        justifyContent: "center"
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "75%",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 13
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height: 50
    },

    textStyle: {
        color: "#fff",
        fontFamily: themes.F1_Family2,
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: themes.F1_Family1,
        color: themes.OrangeColor2,
        fontSize: 16
    },
    cardsContainer: {
        // padding: 2
        marginLeft: 20,
        marginRight: 20
    },
    divider: {
        height: 1,
        backgroundColor: '#E1E1E1',
        marginTop: 12

    },
    cardsLabelText: {
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 4,
        fontWeight: '400',
        fontFamily: themes.F1_Family1
    },
    markDefaultText: {
        fontFamily: themes.F1_Family1,
    },
    defaultCard: {
        color: themes.OrangeColor1,
        opacity: 1

    },
    checkimg: {
        height: 14,
        width: 14,
        marginLeft: -7,
    },

    checkbox: {
        height: 20,
        width: 20,
        backgroundColor: themes.OrangeColor1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addWalletBtn: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
        paddingLeft: 12,
        paddingRight: 12,
        alignSelf: 'flex-start',
        borderRadius: 10,
        height: 50
    },
    googleWalletLogo: {
        height: 65,
        width: 65
    },
    appleWalletLogo: {
        height: 68,
        width: 56
    },
    addToWalletModalTitle: {
        fontSize: 22,
        fontFamily: themes.F1_Family2,
        marginBottom: 25,
        marginTop: 25
    },
    addToWalletModalSubtitle: {
        fontFamily: themes.F1_Family1,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25
    },
    addToWalletBtn: {
        backgroundColor: themes.BlueColor2,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
    },
    cancelAddCardBtn: {
        color: themes.OrangeColor1,
        textAlign: 'center',
        paddingTop: 22
    }
})
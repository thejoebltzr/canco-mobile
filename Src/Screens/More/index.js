import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
var Windowidth = Dimensions.get('window').width;
var ratio = (Windowidth - (Windowidth / 10)) / 1300
var cardHeight = 900 * ratio




export default function More({ navigation }) {

    const { myCards, selectedCardIndex } = useSelector(({ authRed }) => authRed)
    const selectedCard = myCards[selectedCardIndex]
    const insets = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
            <ScrollView>
                <View style={{ backgroundColor: themes.OrangeColor2 }}>
                    <View style={styles.orangeView}>
                        {/* <View style={styles.container}> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center" }} >
                                <Image style={{ height: 15, width: 20, marginLeft: '10%', marginTop: '-5%', tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                            </TouchableOpacity>
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading1}>More</Text>
                            </View>
                        </View>
                        {/* </View> */}
                    </View>
                    <View style={styles.whiteView}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => navigation.navigate("TransferFunds")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={styles.containerView}>
                                        <Image resizeMode="contain" style={{ height: 23, width: 22 }} source={require("../../Images/transfer.png")} />
                                        <Text style={styles.title}>Transfer Funds</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 25, width: 23, tintColor: '#6E7279' }} source={require("../../Images/arrow.png")} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderColor: '#dfdfdf', borderWidth: .7, marginTop: '5%' }} />
                            <TouchableOpacity onPress={() => navigation.navigate("CancoCardWallet")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10%' }}>
                                    <View style={styles.containerView}>
                                        <Image resizeMode="contain" style={{ height: 23, width: 22 }} source={require("../../Images/wallet.png")} />
                                        <Text style={styles.title}>My Cards and Wallet</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 25, width: 23, tintColor: '#6E7279' }} source={require("../../Images/arrow.png")} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderColor: '#dfdfdf', borderWidth: .7, marginTop: '3%' }} />
                            <TouchableOpacity onPress={() => navigation.navigate("BuiltInBrowse")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10%' }}>
                                    <View style={styles.containerView}>
                                        <Image resizeMode="contain" style={{ height: 23, width: 22 }} source={require("../../Images/gift.png")} />
                                        <Text style={styles.title}>Buy E-Gift Cards</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 25, width: 23, tintColor: '#6E7279' }} source={require("../../Images/arrow.png")} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderColor: '#dfdfdf', borderWidth: .7, marginTop: '3%' }} />
                            <TouchableOpacity onPress={() => navigation.navigate("ScanQrCode")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10%' }}>
                                    <View style={styles.containerView}>
                                        <Image resizeMode="contain" style={{ height: 23, width: 22, tintColor: themes.OrangeColor2 }} source={require("../../Images/QrCode.png")} />
                                        <Text style={styles.title}>My Bar Code</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 25, width: 23, tintColor: '#6E7279' }} source={require("../../Images/arrow.png")} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderColor: '#dfdfdf', borderWidth: .7, marginTop: '3%' }} />
                        </View>

                        {
                            myCards.length > 0 ?
                                <Card
                                    card={selectedCard}
                                    navigation={navigation}
                                /> : null
                        }
                        <View style={{ marginTop: '3%', marginBottom: "15%" }} />
                        {/* <View style={{ height: 25 }} /> */}
                    </View>

                </View>


            </ScrollView>

            <BottomTab
                usecolor1={themes.BlueColor1}
                usecolor2={themes.BlueColor1}
                usecolor3={themes.BlueColor1}
                usecolor4={themes.OrangeColor2}
                Img1={require("../../Images/Home.png")}
                Img2={require("../../Images/Location.png")}
                Img3={require("../../Images/Promotion.png")}
                Img4={require("../../Images/More2.png")}
                opc1={.4}
                opc2={.4}
                opc3={.4}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    orangeView: {
        // backgroundColor: themes.OrangeColor2,
        height: 110,
        paddingBottom: 12
    },
    container: {
        marginVertical: 40,
        marginHorizontal: 30,

    },
    heading1: {
        fontSize: 22,
        color: "#fff",
        fontFamily: themes.F2_Family1,
        fontWeight: '600',
    },
    orangeRactangle: {
        width: "100%",
        height: 244,
        marginTop: "10%",
        flexDirection: 'row',
        alignContent: "center",
        height: cardHeight
    },
    digits12: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 25,
        marginTop: -5,
        paddingTop: 25,
        paddingLeft: 2,
    },

    whiteView: {
        borderRadius: 50,
        backgroundColor: '#fff',
        marginTop: '-8%',
        height: '100%'
    },
    containerView: {
        // backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: themes.BlueColor1,
        fontSize: 16,
        fontFamily: themes.F2_Family1,
        paddingLeft: '8%',
        // fontWeight:'700'
    },

    orangeInner: {
        flexDirection: 'row',
    },
    subHeading: {
        fontSize: 18,
        fontFamily: themes.F1_Family2,
        color: '#fff',
        paddingTop: 10
    },
    heading: {
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "8%"
    },
    loyaltyBalance: {
        fontSize: 15,
        fontFamily: themes.F2_Family1,
        color: '#fff',
        paddingTop: 5
    },
    loyaltyBalance1: {
        fontSize: 12,
        fontFamily: themes.F2_Family1,
        color: '#fff',
        // paddingTop: 2
    },
    digitMain: {
        flexDirection: 'row',
        marginTop: 10,
        // alignItems: 'center'
    },
    digits: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 45,
        lineHeight: 55,
        textAlign: 'center',
        marginTop: -5
    },
    threeDigitMain: {
        borderWidth: 1,
        borderColor: "#fff",
        marginLeft: 5,
        width: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numbers: {
        color: "#fff",
        paddingTop: 5,
        fontSize: 15,
        fontFamily: themes.F2_Family2
    },
    whitebutton: {
        backgroundColor: "#ffff",
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '4%'
    },
    whiteButtonText: {
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        fontSize: 16
    },
    recentTrans: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dashboardSide: {
        height: 153,
        width: 153,
        marginLeft: '-4.3%'
    },

    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "88%"
    },

    secondContainer: {
        marginHorizontal: 13
    },


})

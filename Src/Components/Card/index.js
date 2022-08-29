import { ThemeProvider, useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Image, Animated } from 'react-native';
import { themes } from '../../Constant/theme';
// import NumberTicker from 'react-native-number-ticker';
// import NumberTickerInput from "react-native-number-ticker-input";
import NumberTicker from '../NumberTicker';

var Windowidth = Dimensions.get('window').width;
var ratio = (Windowidth - (Windowidth / 10)) / 1300
var cardHeight = 900 * ratio

const Card = ({ card, navigation, disabled = false, index }) => {

    const [animateTo, setAnimateTo] = useState(0)
    const [giftBalance, setGiftBalance] = useState()

    useFocusEffect(
        useCallback(() => {

            // const cashBalance = parseFloat(card?.gift) + parseFloat(card?.loyalty) + parseFloat(card?.promo)
             const cashBalance =  parseFloat(card?.gift) 

            if (cashBalance == 0) {
                setAnimateTo(cashBalance.toFixed(2))
                return
            }
            if (cashBalance) {

                setAnimateTo(cashBalance.toFixed(2))
                return
            }


        }, [card])
    )

    function getBalance() {
        if (card && card.cardnumber) {
            if (card.cardnumber.startsWith('637738') && card.loyalty != "null") {
                return (Math.round(card.loyalty * 100) / 100).toFixed(2) * 100
            }
            else if (card.cardnumber.startsWith('604958') && card.gift != "null") {
                // console.log("2    ",card.loyalty)
                return (Math.round(card.loyalty * 100) / 100).toFixed(2) * 100
            }
        }
        return 0.0
    }

    return (
        <View>
            <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={() => navigation.navigate("MyBalance", { card: card })}>
                <ImageBackground resizeMode="stretch" source={require("../../Images/orange11.png")} style={styles.orangeRactangle}  >
                    <View style={{ flex: 1 }}>
                        {/* <View style={{ width: "82%" }}>
                            <Text style={{ fontSize:(Windowidth/100)*7, fontFamily: themes.F3_Family1, color: '#fff', textAlign: "center" }}>
                                Savings begin here
                            </Text>
                        </View> */}
                        <Text style={{ fontSize: (Windowidth / 100) * 4.5, fontFamily: themes.F1_Family2, color: '#fff', textAlign: 'center' }}>Savings begin here</Text>

                        <View style={{ paddingStart: 40 }}>
                            <Text style={styles.textSubtitle}>Canco Cash Balance</Text>
                            <View style={{ height: (Windowidth / 100) * 16, marginTop: (Windowidth / 100) * 3 }}>
                          
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ color: "#fff", fontSize: (Windowidth / 100) * 8, fontFamily: themes.F2_Family1, textAlign: "center" }}>$</Text>
                                    <View style={{ paddingLeft: 8, }}>
                                        <NumberTicker
                                            number={animateTo}
                                            textSize={55}
                                            duration={3000}
                                            textStyle={{ fontWeight: 'bold', color: '#fff' ,fontFamily:themes.F2_Family1   }}
                                        />
                                    </View>
                                </View>

                            </View>
                            <Text style={{ color: '#fff', marginTop: 8 }}>Last Updated: {card?.dateUpdated}</Text>
                            <Text style={styles.numbers}>{card?.cardnumber}</Text>

                            <TouchableOpacity style={{ flexDirection: "row", marginTop: 16 }} onPress={() => navigation.navigate("CardTransactions", { cardNumber: card?.cardnumber })}>
                                <Text style={[styles.textSubtitle2]}>Recent Transactions</Text>
                                <Image resizeMode="contain" style={{ height: 14, width: 13, tintColor: '#fff', marginTop: 4, marginLeft: '5%' }} source={require("../../Images/backArrow.png")} />
                            </TouchableOpacity>
                        </View>


                        {/* <View style={{alignItems:'flex-start', marginTop:8}}>
                            <View style={{backgroundColor:'#fff', padding:8, paddingLeft:16 ,paddingRight: 16 , borderRadius:32}}>
                                <Text style={{ fontSize: (Windowidth/100)*4, fontWeight:'bold'}}>Gift Balance:
                                    <Text style={{color:'#F57026'}}>${giftBalance}</Text>
                                </Text>
                            </View> 
                        </View> */}



                        {/* <View style={{justifyContent:"flex-end",marginTop:"auto"}}>
                            
                            <View style={styles.recentTrans}>
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("CardTransactions", { cardNumber: card?.cardnumber })}>
                                    <Text style={[styles.textSubtitle2, { textDecorationLine: 'underline' }]}>Recent Transactions</Text>
                                    <Image resizeMode="contain" style={{ height: 14, width: 13, tintColor: '#fff', marginTop: 7, marginLeft: '5%' }} source={require("../../Images/backArrow.png")} />
                                </TouchableOpacity>
                            </View>

                        </View> */}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

    )

};
const styles = StyleSheet.create({

    orangeRactangle: {
        width: "95%",
        marginVertical: 5,
        marginLeft: '5%',
        flexDirection: 'row',
        alignContent: "center",
        // height: cardHeight,
        paddingVertical: (Windowidth / 100) * 4,
        paddingBottom: (Windowidth / 100) * 5
    },
    textSubtitle: {
        fontSize: (Windowidth / 100) * 4.5,
        fontFamily: themes.F2_Family1,
        color: '#fff',
        paddingTop: (Windowidth / 100) * 2
    },
    textSubtitle2: {
        fontSize: (Windowidth / 100) * 3.8,
        fontFamily: themes.F2_Family1,
        color: '#fff',
    },
    digitMain: {
        flexDirection: 'row',
        alignItems: "center"
    },
    digits: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
    },
    digitDecimal: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 35,
        textAlignVertical: 'bottom',
        marginBottom: 8
    },
    numbers: {
        color: "#fff",
        fontFamily: themes.F2_Family2,
        fontSize: (Windowidth / 100) * 4.8
    },
    recentTrans: {
        flexDirection: 'row',

    },
});
export default Card
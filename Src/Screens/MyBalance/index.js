import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ImageBackground, FlatList, Pressable, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RecentTransaction } from '../../Redux/action';
import moment from "moment";
import { formatAmount } from '../../Utility/Utils';
import Card from '../../Components/Card';

var Windowidth = Dimensions.get('window').width;
var ratio =  (Windowidth - (Windowidth / 10)) / 1300 
var cardHeight =  800 * ratio

export default function MyBalance({ navigation, route }) {
    const { card } = route.params
    const [loader, setLoader] = useState(true)
    const { token, recentTransaction } = useSelector(({ authRed }) => authRed)
    const dispatch = useDispatch()

    useEffect(() => {
        getRecentTransactions()
         
    }, [])

    async function getRecentTransactions(){

        dispatch(RecentTransaction(token, card.cardnumber, 10, () => {
            setLoader(false)
        }))
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image resizeMode="contain" style={{ height: 18, width: 15, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <Text style={styles.heading}>My Balance</Text>
                    </View>
                </View>
                <Card
                    card={card}
                    navigation={navigation}
                    disabled
                />
            </View>
           
            <View style={styles.secondContainer}>
            
                <View style={styles.headingContainer}>
                    <Text style={styles.heading1}></Text>
                    <TouchableOpacity onPress={() => navigation.navigate("CardTransactions", {cardNumber: card.cardnumber})}>
                        <Text style={styles.missingPoint}>View More</Text>
                    </TouchableOpacity>
                </View>
                
                {!loader ?
                <View >
                    {recentTransaction && recentTransaction.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={recentTransaction}
                        renderItem={({ item, index }) =>
                            <View>
                                <Pressable  style={{flex:1}}>
                                        <View style={[styles.fullView, {flex:1}]}>
                                            <View style={{flexDirection:'row', flex:1}}>
                                                <View style={{flex:1}}>
                                                    <View style={{flexDirection:'row'}}>
                                                        <View >
                                                            <Image style={{ height: 32, width: 32 }} source={require("../../Images/cancoIcon1.png")} />
                                                        </View>
                                                        <View style={{flex:1, paddingLeft:16}}>
                                                            <Text style={{ fontFamily: themes.F2_Family2, fontSize: 14 }}>{item.transaction_description ? item.transaction_description : "No Description"}</Text>
                                                            <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1.5%" }}>{ item.created_at}</Text> 
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <Image resizeMode="contain" style={styles.location} source={require("../../Images/location2.png")} />
                                                                <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1%", paddingLeft: "4%", letterSpacing: .5 }}>{item.location}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    
                                                </View>
                                                <View style={{flex:0.3}}>
                                                     <Text style={{ fontFamily: themes.F2_Family2, fontSize: 14 }}>{formatAmount(item.transaction_amount)}</Text>
                                                     <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1.5%" }}>{item.transaction_type == "GiftFund" ? "Gift Redeemed" : item.transaction_type == "LoyaltyFund" ? "Loyalty Redeemed" : item.transaction_type == "PromoLoyaltyFund" ? "Promotion Fund" : item.transaction_type}</Text>
                                                </View>
                                            </View>
                                        </View>

                                </Pressable>
                                {index != 2 ?
                                    <View style={{ borderWidth: .3, borderColor: '#ccc', width: "90%", marginTop: 15, alignSelf: 'center'}}>
                                    </View>
                                    :
                                    null
                                }

                            </View>}
                        keyExtractor={item => item.id}

                    />
                    : <Text style={{fontSize:18, alignSelf: 'center', marginTop: 20,fontFamily:themes.F2_Family1}}>No transactions found!</Text>}
                </View>
                :
                <ActivityIndicator  size="small" color={themes.BlueColor1} />
                }

            </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    head: {
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    orangeRactangle: {
        width: "100%",
        marginVertical: 5,
        flexDirection: 'row',
        alignContent: "center",
        height: cardHeight,
        padding: 20
    },
    title: {
        fontSize: 23,
        color: themes.BlueColor1,
        paddingHorizontal: 20,
        fontFamily: themes.F2_Family1
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
        paddingLeft: "8%",
        marginBottom: 10
    },
    loyaltyBalance: {
        fontSize: 15,
        fontFamily: themes.F2_Family1,
        color: '#fff',
        // paddingTop: 5
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
        marginTop: -5,
        // backgroundColor:"red"
    },
    threeDigitMain: {
        borderWidth: 1,
        borderColor: "#fff",
        marginLeft: 5,
        width: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
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
    digits12: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 25,
        marginTop: -5,
        paddingTop: 25,
        paddingLeft: 2,
    },
    whiteButtonText: {
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        fontSize: 16
    },
    dashboardSide: {
        height: 153,
        width: 153,
        marginLeft: '-4.3%'
    },
    heading1: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        // backgroundColor:"red",
        alignSelf:"center"
    },
    missingPoint: {
        fontSize: 12,
        marginTop: 20,
        textDecorationLine: "underline",
        color: "#000",
        fontFamily: themes.F2_Family1,
        paddingTop: '2%'
    },
    secondContainer: {
        marginHorizontal: 13
    },
    fullView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        width: '87%'
    },
    Logo: {
        height: 31,
        width: 31,
    },
    fullViewInner: {
        marginLeft: '5%',
        width: '60%'
    },
    location: {
        height: 10,
        width: 9,
        tintColor: '#808080'
    },
    flatlistLogo: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: themes.TextInputBGC,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullView: {
        // backgroundColor:"yellow",
        flexDirection: "row",
        marginTop: "3%",
        justifyContent: "space-between"
    },
    location: {
        height: 10,
        width: 9,
        tintColor: '#808080'
    }
})

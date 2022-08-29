import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { themes } from '../../Constant/theme';
import { RecentTransaction } from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { formatAmount } from '../../Utility/Utils';
import { ScrollView } from 'react-native-gesture-handler';

export default function CardTransactions({ route }) {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const { token, recentTransaction, loading } = useSelector(({ authRed }) => authRed)
    const [loader, setLoader] = useState(true)
    const { cardNumber } = route.params
    useEffect(() => {
        dispatch(RecentTransaction(token, cardNumber, 100, () => {
            setLoader(false)
        }))
    }, [])

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: '-5%' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>Recent Transactions</Text>
                </View>
                <View >
                    <View style={[styles.headingContainer, { marginBottom: 20 }]}>

                        <Text style={styles.simpleText}>{cardNumber}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("MissingPoints")}>
                            <Text style={styles.missingPoint}>Missing points?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View >
                    {loader ?
                        <ActivityIndicator style={{ marginTop: "10%" }} size="small" color={themes.BlueColor1} />
                        :

                        <View style={{flexGrow: 1}}>
                            {recentTransaction && recentTransaction.length > 0 ?
                                <FlatList
                                
                                    showsVerticalScrollIndicator={false}
                                    data={recentTransaction}
                                    renderItem={({ item, index }) =>
                                        <View style={{}}>
                                            <Pressable >
                                                <View style={styles.fullView}>
                                                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                                                        <View style={{ backgroundColor: "#ececec", height: 45, width: 45, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                            <Image style={{ height: 26, width: 32 }} source={require("../../Images/cancoIcon1.png")} />
                                                        </View>
                                                        <View style={{ marginLeft: "4%" }}>
                                                            <Text style={{ fontFamily: themes.F2_Family2, fontSize: 14 }}>{item.transaction_description ? item.transaction_description : "No Description"}</Text>
                                                            <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1.5%" }}>{item.created_at}</Text>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <Image resizeMode="contain" style={styles.location} source={require("../../Images/location2.png")} />
                                                                <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1%", paddingLeft: "4%", letterSpacing: .5 }}>{item.location}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                                        <Text style={{ fontFamily: themes.F2_Family2, fontSize: 14 }}>{formatAmount(item.transaction_amount)}</Text>
                                                        <Text style={{ fontFamily: themes.F2_Family1, fontSize: 12, opacity: .6, paddingTop: "1.5%" }}>{item.transaction_type == "GiftFund" ? "Gift Redeemed" : item.transaction_type == "LoyaltyFund" ? "Loyalty Fund" : item.transaction_type == "PromoLoyaltyFund" ? "Promotion Fund" : item.transaction_type}</Text>
                                                    </View>
                                                </View>
                                            </Pressable>
                                            {/* {index != 2 ?
                                            <View style={{ borderWidth: .3, borderColor: '#ccc', width: "95%", marginTop: 15 }}>
                                            </View>
                                            :
                                            null
                                        } */}

                                            <View style={{ borderWidth: .3, borderColor: '#ccc', width: "95%", marginTop: 15 }}>
                                            </View>

                                        </View>}
                                    keyExtractor={item => item.id}
                                   ListFooterComponent={() =>
                                    <View style={{height:200}}></View>
                                   }
                                />
                                : <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 20 }}>No transactions found!</Text>}
                        
                        
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 15,
     

    },
    heading1: {
        fontSize: 22,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
    },
    simpleText: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10
    },
    headingContainer: {
        marginLeft: '7%'
    },
    missingPoint: {
        fontSize: 14,
        textDecorationLine: "underline",
        color: "#000",
        fontFamily: themes.F2_Family1,
        // paddingTop: '2%'
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
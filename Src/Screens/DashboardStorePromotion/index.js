import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotion, getUpcommingPromotion, getCardDetails, getCurrentPromotion, GetDefaultCard } from '../../Redux/action';
import { SELECTED_CARD_INDEX, MY_CARDS, DEFAULT_CARD } from '../../Redux/constant';
import { formatAmount } from '../../Utility/Utils';
import { useFocusEffect } from '@react-navigation/core';
import Card from '../../Components/Card';
import FastImage from 'react-native-fast-image'


import { useSafeAreaInsets } from 'react-native-safe-area-context';

var Windowidth = Dimensions.get('window').width;
var ratio = (Windowidth - (Windowidth / 10)) / 1300
var cardHeight = 900 * ratio
var boxViewWidth = Windowidth / 2 - 50;

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch()
    const { myCards, selectedCardIndex, defaultCard } = useSelector(({ authRed }) => authRed)
    const { storeUpcomingPromotion, storeCurrentPromotion, token, currentUser } = useSelector(({ authRed }) => authRed)
    const [color1, setcolor1] = useState(themes.OrangeColor2)
    const [color2, setcolor2] = useState("#fff")
    const [screen, setscreen] = useState(1)
    const selectedCard = myCards[selectedCardIndex]
    const insets = useSafeAreaInsets()

    useFocusEffect(
        React.useCallback(() => {

            if (!global.cardNumbers) {
                let c = []
                console.log("LIST CARDS", myCards)
                myCards.forEach(element => {
                    c.push(element.cardnumber)
                });
                global.cardNumbers = c
            } else {
                dispatch(getCardDetails(token))
            }

            if (selectedCard == null) {
                if (myCards.length > 0)
                    dispatch({ type: SELECTED_CARD_INDEX, data: 0 })
            }

            dispatch(getUpcommingPromotion(token))
            dispatch(getCurrentPromotion(token))
            getDefaultCard();

            return () => { }

        }, [global.cardNumbers])
    );

    const selectNextCard = () => {
        dispatch({ type: SELECTED_CARD_INDEX, data: selectedCardIndex + 1 })
    }

    const selectPrevCard = () => {
        dispatch({ type: SELECTED_CARD_INDEX, data: selectedCardIndex - 1 })
    }

    const PressFirst = (index) => {
        setscreen(index)
        if (index == 1) {
            setcolor2("#fff")
            setcolor1(themes.OrangeColor2)
        }
        else {
            setcolor1("#fff")
            setcolor2(themes.OrangeColor2)
        }
    }

    const getDefaultCard = async () => {
        var data = new FormData();
        data.append("email", currentUser.email);

        try {
            const res = await GetDefaultCard(data, token);
            if (res.Response.default_card_number) {
                const card = myCards.find((item) => item.cardnumber == res.Response.default_card_number);
                const index = myCards.findIndex((item) => item.cardnumber == res.Response.default_card_number);

                if (index > -1) {
                    dispatch({ type: DEFAULT_CARD, data: card })
                    dispatch({ type: SELECTED_CARD_INDEX, data: index })
                }
            } else {
                dispatch({ type: DEFAULT_CARD, data: null })
            }
        } catch (err) {
            console.log("ERROR defaulr card", err)
            if (myCards && !defaultCard) {
                dispatch({ type: DEFAULT_CARD, data: myCards[0] })
            }

            // const index = myCards.findIndex((item) => item.cardnumber == defaultCard.cardnumber); 
            // dispatch({ type: SELECTED_CARD_INDEX, data: index })
            // setSelectedCard(defaultCard)
            // console.log("selected Card inde::", selectedCardIndex, index  ,defaultCard.cardnumber)

            // console.log("default CArd",defaultCard.cardnumber)
        }
    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: insets.top }}>
            {currentUser ?
                <View style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 10 }}>
                    <View style={styles.head}>
                        <Text style={styles.title}>Welcome Back{" "}{currentUser.firstname}!</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '23%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                                <Image resizeMode="contain" style={{ height: 30, width: 30, marginTop: 5 }} source={require("../../Images/notification.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                {currentUser.line2 && currentUser.line2 != "undefined" ?

                                    <View style={{ height: 40, width: 40, borderRadius: 30, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                        {currentUser.line2 ?
                                            <Image style={{ height: "100%", width: "100%", position: 'absolute', borderRadius: 80 }} source={{ uri: currentUser.line2 }} />
                                            :
                                            <ActivityIndicator color="blue" size="small" />
                                        }
                                    </View>
                                    :
                                    <View style={{ height: 40, width: 40, borderRadius: 30, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                        <Image resizeMode="contain" style={{ height: 40, width: 40, position: 'absolute', borderRadius: 80 }} source={require("../../Images/profile2.jpg")} />

                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :
                <ActivityIndicator size="small" color={themes.BlueColor1} />
            }
            <ScrollView nestedScrollEnabled={true}>
                {selectedCard && myCards.length > 0 ?
                    <View>
                        <Card
                            key={selectedCardIndex}
                            card={selectedCard}
                            navigation={navigation}
                            index={selectedCardIndex}
                        />
                        {selectedCardIndex != 0 ?
                            <TouchableOpacity onPress={() => selectPrevCard()}
                                style={{ justifyContent: 'center', width: '15%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', padding: 20 }}>
                                <Image resizeMode="contain" style={{ height: 40, width: 40, tintColor: '#fff', }} source={require("../../Images/leftArrow.png")} />
                            </TouchableOpacity>
                            : null}
                        {selectedCardIndex != myCards.length - 1 ?
                            <TouchableOpacity onPress={() => selectNextCard()}
                                style={{ justifyContent: 'center', width: '15%', position: 'absolute', top: 0, right: 20, bottom: 0, alignItems: 'center', padding: 20, paddingEnd: 0 }}>
                                <Image resizeMode="contain" style={{ height: 40, width: 40, alignSelf: 'flex-end', marginHorizontal: "-20%" }} source={require("../../Images/rightArrow.png")} />
                            </TouchableOpacity>
                            : null}
                    </View>
                    :
                    null
                }

                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', flex: 1, borderWidth: 1.5, height: 50, borderColor: "#E06A2C", borderRadius: 25, marginTop: "3%", width: '92%', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => PressFirst(1)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color1, borderTopLeftRadius: 25, borderBottomLeftRadius: 25 }}>
                            <View >
                                <Text style={{ fontFamily: themes.F2_Family1, fontSize: 14, color: color2 }}>Current Promotions</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => PressFirst()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color2, borderTopRightRadius: 25, borderBottomRightRadius: 25 }} >
                            <View >
                                <Text style={{ fontFamily: themes.F2_Family1, fontSize: 14, color: color1 }}>Upcoming Promotions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container1}>
                        {screen == 1 ?
                            <View>
                                {storeCurrentPromotion ?
                                    storeCurrentPromotion.length > 0 ?
                                        <View style={{ marginTop: '5%', marginHorizontal: 0 }}>
                                            <FlatList
                                                numColumns={2}
                                                columnWrapperStyle={{ justifyContent: 'space-between', width: '100%', }}
                                                data={storeCurrentPromotion}
                                                renderItem={({ item }) =>
                                                    <View style={{ paddingHorizontal: 8 }}>
                                                        <Pressable style={{}} onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, image: item.promoImage, detail: item.productInclusion, price: item.price, message: item.message })}>
                                                            <View style={styles.boxView}>
                                                                {/* <Image resizeMode="contain" source={{ uri: item.promoImage }} style={styles.productImage}  /> */}
                                                                <FastImage source={{uri:item.promoImage,priority: FastImage.priority.normal}} style={styles.productImage}/>
                                                                <Text style={styles.productname}>{item.promoName}</Text>
                                                                {/* <Text style={styles.range}>Upto{" "}{item.multiplyer}{" "}points</Text> */}
                                                                <Text style={styles.price}>{formatAmount(item.price)}</Text>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                }
                                                keyExtractor={item => item.promoId} />
                                        </View>
                                        : <Text style={styles.productname}>No promos available!</Text>
                                    :
                                    <ActivityIndicator size="small" color="#18243C" />}
                                <View style={{ height: 40 }}></View>

                                <TouchableOpacity onPress={() => navigation.navigate("CurrentPromotion")} style={styles.button1}>
                                    <Text style={styles.button1text}>
                                        See All
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ height: 50 }} />
                            </View>
                            :
                            <View>
                                <View>
                                    {storeUpcomingPromotion ?
                                        storeUpcomingPromotion.length > 0 ?
                                            <View style={{ marginTop: '5%', marginHorizontal: 0 }}>
                                                <FlatList
                                                    numColumns={2}
                                                    columnWrapperStyle={{ justifyContent: 'space-between', width: '100%', }}
                                                    data={storeUpcomingPromotion}
                                                    renderItem={({ item }) =>
                                                        <View style={{ paddingHorizontal: 8 }}>
                                                            <Pressable onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, image: item.promoImage, detail: item.promoDetail, price: item.price, message: item.message, type: "upcoming" })}>
                                                                <View style={styles.boxView}>
                                                                    <Image resizeMode="contain" source={{ uri: item.promoImage }} style={styles.productImage}  >
                                                                    </Image>
                                                                    <Text style={styles.productname}>{item.promoName}</Text>
                                                                    {/* <Text style={styles.range}>Upto{" "}{item.multiplyer}{" "}points</Text> */}
                                                                    <Text style={styles.price}>{formatAmount(item.price)}</Text>
                                                                </View> 
                                                            </Pressable>
                                                        </View>
                                                    }
                                                    keyExtractor={item => item.promoId} />
                                                <View style={{ height: 40 }}></View>

                                                <TouchableOpacity onPress={() => navigation.navigate("UpcomingPromotion")} style={styles.button1}>
                                                    <Text style={styles.button1text}>
                                                        See All
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            : <Text style={styles.productname}>No promos available!</Text>
                                        :
                                        <ActivityIndicator size="small" color="#18243C" />}
                                    {/* <View style={{ height: 40 }}></View>
                                <Pressable onPress={() => navigation.navigate("CurrentPromotion")} style={styles.button1}>
                                    <Text style={styles.button1text}>
                                        See All
                                    </Text>
                                </Pressable>
                                <View style={{ height: 50 }} /> */}
                                </View>

                                <View style={{ height: 40 }}></View>

                                <View style={{ height: 50 }} />
                            </View>
                        }

                    </View>

                </View>
            </ScrollView>
            <BottomTab
                usecolor1={themes.OrangeColor2}
                usecolor2={themes.BlueColor1}
                usecolor3={themes.BlueColor1}
                usecolor4={themes.BlueColor1}
                Img1={require("../../Images/Home2.png")}
                Img2={require("../../Images/Location.png")}

                Img3={require("../../Images/Promotion.png")}
                Img4={require("../../Images/More.png")}

                opc2={.4}
                opc3={.4}
                opc4={.4}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingBottom: 40,
    },
    container1: {
        marginHorizontal: 20,
    },

    orangeRactangle: {
        width: "90%",
        marginVertical: 5,
        marginLeft: '8%',
        flexDirection: 'row',
        alignContent: "center",
        height: cardHeight
    },
    orangeInner: {
        flexDirection: 'row',
        height: 250,
        width: '100%',
        marginVertical: 5,
        backgroundColor: "#ff9269",
        borderRadius: 30
    },
    head: {
        flexDirection: 'row',
        // backgroundColor:"red",
        alignItems: "center"
    },
    title: {
        fontSize: 21,
        color: themes.BlueColor1,
        paddingLeft: 20,
        fontFamily: themes.F2_Family1,
        // fontWeight: 'bold',
        // backgroundColor:"yellow",
        width: "72%",
    },
    textSubtitle: {
        fontSize: 18,
        fontFamily: themes.F2_Family1,
        color: '#fff'
    },
    digitMain: {
        flexDirection: 'row',
    },
    digits: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 65,
    },
    digitDecimal: {
        color: '#fff',
        fontFamily: themes.F2_Family2,
        fontSize: 35,
        textAlignVertical: 'bottom',
        marginBottom: 8
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
        fontFamily: themes.F2_Family2,
        fontSize: 20
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
        height: "90%",
        width: "90%",
        flex: 1,
        marginLeft: 45,
        top: 25,
        justifyContent: 'center',
        position: 'relative'
    },
    productImage: {
        height: 100,
        width: '100%',
        marginTop: 15
    },
    productname: {
        fontSize: 15,
        fontFamily: themes.F2_Family2,
        lineHeight: 17,
        color: themes.BlueColor1,
        textAlign: 'center',
        paddingTop: '10%',
    },
    range: {
        color: "#000000",
        fontSize: 10,
        lineHeight: 12,
        fontFamily: themes.F2_Family1,
    },
    price: {
        fontFamily: themes.F2_Family2,
        fontSize: 18,
        textAlign: 'center',
        color: themes.BlueColor1,
        paddingTop: "10%",
        marginBottom: 20
    },
    button1: {
        color: themes.OrangeColor2,
        height: 60,
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: themes.OrangeColor2,

    },
    button1text: {
        color: themes.OrangeColor2,
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
        // marginTop:'5%'
    },
    boxView: {
        width: boxViewWidth,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        elevation: 4,
        marginTop: 15,
        marginBottom: '4%'
    }

})

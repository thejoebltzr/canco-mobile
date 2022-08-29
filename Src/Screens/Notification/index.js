import React, { useEffect, useState, setState } from 'react';
import { Button, View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { getUpcommingPromotion } from '../../Redux/action';
import Icon from "react-native-vector-icons/Ionicons";


export default function Notification({ navigation }) {

    const dispatch = useDispatch()
    const { token } = useSelector(({ authRed }) => authRed)
    const { storeUpcomingPromotion, storeCurrentPromotion } = useSelector(({ authRed }) => authRed)
    const [notificatons, setNotifications] = useState(storeUpcomingPromotion.concat(storeCurrentPromotion))

    const [seeAll, setSeeAll] = useState(false)



    useEffect(() => {
        dispatch(getUpcommingPromotion(token))
    }, [])





    return (
        <View>
            <View style={styles.orangeView}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '8%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image style={{ height: 15, width: 20, marginTop: '-5%', tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading1}>Notification</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchNotification')} >
                            <Icon size={25} name="search" color="white" style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.whiteView}>
                <View style={styles.container}>

                    {notificatons ?
                        <View>
                            <FlatList
                                nestedScrollEnabled={true}
                                ListFooterComponent={() => <View />}
                                initialNumToRender={4}
                                // style={{ height: "90%" }}
                                data={seeAll ? notificatons : notificatons.slice(0, 5)}
                                renderItem={({ item, index }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion, message: item.message })}  >

                                            <View style={styles.fullView}>
                                                <View style={[styles.fullView2]}>
                                                    <View style={{ backgroundColor: '#f3f3f3', borderRadius: 30, height: 55, width: 55, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image resizeMode="contain" style={styles.cancoLogo} source={{ uri: item.promoImage }} />
                                                    </View>
                                                    <View style={[styles.fullViewInner], { width: "80%", marginLeft: 7, marginTop: 1 }}>
                                                        <Text>
                                                            <Text style={styles.notify}>{item.message}</Text>
                                                            <Text style={[styles.notify], { fontFamily: themes.F2_Family2 }}> {item.promoName}
                                                            </Text>
                                                            <Text> for</Text> <Text style={{ fontFamily: themes.F2_Family2 }}> ${item.price}
                                                            </Text>
                                                            <Text style={{ fontFamily: themes.F2_Family1 }}>. Click here for more info</Text>
                                                        </Text>
                                                        <Text style={{ fontSize: 12, lineHeight: 20, color: "#8f92a1", fontFamily: themes.F2_Family1 }}>{moment(item.dateCreated).startOf("hour").fromNow()} </Text>
                                                    </View>
                                                    {/* <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion,message:item.message })}>
                                                     <View style={{ backgroundColor: '#f3f3f3',  height: 10, width: 55, justifyContent: 'center', alignItems: 'center' }}>
                                                           <Image resizeMode="contain" style={styles.threedots} source={require("../../Images/3dots.png")}></Image>
                                                     </View>
                                                     </TouchableOpacity> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                                keyExtractor={item => item.id}
                            />

                        </View>
                        :
                        <ActivityIndicator size="small" color="#18243C" />}

                    {
                        !seeAll && notificatons.length > 5 ?
                            <TouchableOpacity onPress={() => setSeeAll(true)} style={[styles.seeallbutton, { marginTop: 60 }]} >
                                <Text style={styles.button1text}>
                                    See All
                                </Text>
                            </TouchableOpacity>
                            : null
                    }

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    orangeView: {
        backgroundColor: themes.OrangeColor2,
        height: 130
    },
    container: {
        marginVertical: 40,
        // marginHorizontal: 25,
    },
    heading1: {
        fontSize: 22,
        color: "#fff",
        fontFamily: themes.F2_Family1,
        fontWeight: '600',
        marginLeft: '4%'

    },
    headingContainer: {

        width: '82%'
    },
    searchbar: {
        height: 50,
        width: '85%',
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginLeft: -22
    },
    whiteView: {
        // borderRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
        marginTop: '-12%',
        height: '87.7%'
    },
    cancoLogo: {
        height: 40,
        width: 40,
        marginLeft: 2,
    },
    fullView: {
        flexDirection: 'row',
        marginTop: 15,
        // alignItems: 'center',
        // width: '97=%',
        // backgroundColor:'yellow'
    },
    fullView2: {
        flexDirection: 'row',
        // marginTop: 15,
        alignItems: 'center',
        // backgroundColor:'yellow',
        // width: '90%',
        paddingHorizontal: 15,
        // backgroundColor:'red'
    },


    notify: {
        fontFamily: themes.F2_Family1,
        fontSize: 14,
        lineHeight: 22
    },
    seeallbutton: {
        color: themes.textInputColor,
        height: 50,
        width: '80%',
        borderRadius: 30,
        justifyContent: 'center',
        marginVertical: 8,
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: "#212121",
    },
    button1text: {
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14
    },
    iconStyle: {
        marginHorizontal: 10,
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
        color: "#212121",
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
        // marginTop:'5%'
    },
    threedots: {
        height: 40,
        width: 40,
        marginLeft: 2,
    },

})
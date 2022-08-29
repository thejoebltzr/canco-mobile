import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcommingPromotion } from '../../Redux/action';
import { formatAmount } from '../../Utility/Utils';
import moment from "moment";
import { getCurrentPromotion } from '../../Redux/action';
import FastImage from 'react-native-fast-image'

export default function MyBalance({ navigation }) {
    const dispatch = useDispatch()
    const { storeUpcomingPromotion, storeCurrentPromotion, token, loading } = useSelector(({ authRed }) => authRed)
    useEffect(() => {
        dispatch(getUpcommingPromotion(token))
        dispatch(getCurrentPromotion(token))
    }, [])

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{height:36,justifyContent:"center",alignItems:"center"}} >
                            <Image resizeMode="contain" style={{ height: 18, width: 15, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Promotions</Text>
                    </View>
                </View>
                <Text style={styles.Subheading1}>Current Promotions</Text>
                {loading ?
                    <ActivityIndicator size="small" color={themes.BlueColor1} style={{marginVertical: 20}} />
                    :
                    <View>
                        <FlatList
                            data={storeCurrentPromotion}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => 
                            <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion, message: item.message })}>
                                {item.promoBanner.length > 0 ?
                                    <View style={{ justifyContent: 'center', height: 250, width: 285, }}>
                                        {/* <Image resizeMode="cover" style={styles.flatListImage} source={{ uri: item.promoBanner }} /> */}
                                           <FastImage source={{uri:item.promoBanner,priority: FastImage.priority.normal}} style={styles.flatListImage}/>
                                    </View>
                                    : null}
                            </TouchableOpacity>
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
            </View>
            {storeUpcomingPromotion ?
                storeUpcomingPromotion.length > 0 ?
                    <View style={styles.secondContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading1}>Upcoming Promotions</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("UpcomingPromotion")}>
                                <Text style={styles.missingPoint}>View More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: "auto", marginBottom: 100 }}>
                            <FlatList
                                data={storeUpcomingPromotion}
                                renderItem={({ item, index }) =>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion, message: item.message })}>
                                            <View style={styles.fullView}>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>

                                                    <View style={styles.flatlistLogo}>
                                                        <Image resizeMode="contain" style={styles.Logo} source={{ uri: item.promoImage }} />
                                                    </View>
                                                    <View style={styles.fullViewInner}>
                                                        <Text style={{ color: "#000", fontSize: 14, fontFamily: themes.F2_Family1, fontWeight: '700' }}>{item.promoName}</Text>
                                                        <Text style={{ color: "#000", fontSize: 12, fontFamily: themes.F2_Family1, paddingTop: 2, opacity: .4 }}>Effective from {moment(item.effectiveDate).format("MMM D")}</Text>
                                                    </View>
                                                </View>
                                                <View style={{}}>
                                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: themes.F2_Family1, fontWeight: '700' }}>{formatAmount(item.price)}</Text>
                                                    <Text style={{ color: "#000", fontSize: 12, fontFamily: themes.F2_Family1, paddingTop: 2, opacity: .4, alignSelf: 'flex-end' }}>{item.multiplyer}x</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                    : null 
                :
                <ActivityIndicator size="small" color="#18243C" />}
            </ScrollView>

            <View style={{ position: 'absolute', bottom: -2, width: '100%' }}>
                <BottomTab
                    usecolor1={themes.BlueColor1}
                    usecolor2={themes.BlueColor1}
                    usecolor3={themes.OrangeColor2}
                    usecolor4={themes.BlueColor1}
                    Img1={require("../../Images/Home.png")}
                    Img2={require("../../Images/Location.png")}

                    Img3={require("../../Images/Promotion2.png")}
                    Img4={require("../../Images/More.png")}
                    opc1={.4}
                    opc2={.4}
                    opc4={.4}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 40
    },
    head: {
        flexDirection: 'row',
    },
    flatListImage: {
        height: 185,
        width: 275,
        borderRadius: 30
    },
    subHeading: {
        fontSize: 18,
        fontFamily: themes.F1_Family2,
        color: '#fff',
        paddingTop: 10
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "8%",
        paddingTop:"2%"
    },
    heading1: {
        fontSize: 20,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family2,
        paddingLeft: '4%',
        paddingBottom: 10
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    missingPoint: {
        fontSize: 12,
        textDecorationLine: "underline",
        color: "#000",
        fontFamily: themes.F2_Family1,
        paddingTop: '2%'
    },
    secondContainer: {
        marginHorizontal: 13,
    },
    fullView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: "center"
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
    Subheading1: {
        fontSize: 20,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family2,
        paddingTop: '5%'

    }
})

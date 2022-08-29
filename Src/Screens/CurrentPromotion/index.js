import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, Pressable, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPromotion } from '../../Redux/action';
import { formatAmount } from '../../Utility/Utils';

var Windowidth = Dimensions.get('window').width;
var boxViewWidth = Windowidth/2 - 50;

export default function CurrentPromotion({ navigation }) {
    const dispatch = useDispatch()
    const { storeCurrentPromotion,getspecifyLocation, token } = useSelector(({ authRed }) => authRed)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getCurrentPromotion(token))
        });
        return unsubscribe;
    }, [navigation]);
    
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center",alignItems:"center" }} >
                            <Image resizeMode="contain" style={{ height: 18, width: 15, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Promotions</Text>
                    </View>
                    <Text style={styles.subHeading}>
                        Current Promotions
                    </Text>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} >
                    {storeCurrentPromotion ?
                        storeCurrentPromotion.length > 0 ?
                            <View style={{ marginTop: '5%', marginHorizontal: 0 }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between', width: '100%', }}
                                    data={storeCurrentPromotion}
                                    renderItem={({ item, index }) =>
                                        <View style={{ paddingHorizontal: 8 }}>
                                            <Pressable onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, image: item.promoImage, detail: item.productInclusion, price: item.price })}>
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
                            </View>
                        :  <Text style={styles.productname}>No promos available!</Text>
                    : <ActivityIndicator size="small" color="#18243C" />}
                    <View style={{ height: 150,marginTop:4 }} />
                </ScrollView>
            </View>
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
        marginVertical: 45,
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "3%",
        paddingTop:"2%"
    },
    subHeading: {
        fontSize: 20,
        fontFamily: themes.F2_Family2,
        paddingTop: "6%",
        paddingBottom: 15
    },
    productImage: {
        height: 96,
        width: 99,
        marginTop: 15
    },
    productname: {
        fontSize: 15,
        fontFamily: themes.F2_Family2,
        lineHeight: 17,
        color: themes.BlueColor1,
        textAlign: 'center',
        paddingTop:'10%',
    },
    range: {
        color: "#000000",
        fontSize: 10,
        lineHeight: 12,
        fontFamily: themes.F2_Family1,
        // paddingTop: "25%"
    },
    price: {
        fontFamily: themes.F2_Family2,
        fontSize: 18,
        textAlign: 'center',
        color: themes.BlueColor1,
        paddingTop: "10%",
        marginBottom: 20
    },
    boxView: {
        width: boxViewWidth,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        elevation: 4,
        marginTop: 15,
        marginLeft: '.5%',
        marginBottom: '4%'

    }
})

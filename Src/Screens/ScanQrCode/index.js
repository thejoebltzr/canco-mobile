import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import SystemSetting from 'react-native-system-setting'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BarCode({ navigation }) {
    const { token, selectedCardIndex, myCards } = useSelector(({ authRed }) => authRed)
    const [value, setvalue] = useState("TechticksDig");
    const [oldBrightness, setoldBrightness] = useState("")
    const isFocused = useIsFocused()

    const selectedCard = myCards[selectedCardIndex]

    const insets = useSafeAreaInsets()

    useEffect(() => {
        if (isFocused) {
            SystemSetting.getAppBrightness().then((bright) => {
                setoldBrightness(bright)
            })
            SystemSetting.setAppBrightness(1);
        }
        else {
            SystemSetting.setAppBrightness(parseFloat(oldBrightness));
        }
        return
    }, [isFocused])

    return (
        <View style={{ flex: 1, backgroundColor: '#E5E5E5', paddingTop: insets.top }}>
            <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: 2 }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                </TouchableOpacity>
                <Text style={styles.heading}>Scan Code</Text>
            </View>


            {
                myCards.length > 0 ?
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={{ alignItems: 'center' }}>
                                <Image resizeMode="contain" style={{ height: 185, width: 295, marginTop: 5, borderRadius: 50 }} source={require("../../Images/canco_card.png")} />
                                <View style={styles.whiteCard}>
                                    <ImageBackground style={{ height: 164, width: 260, justifyContent: 'center', alignItems: 'center' }}
                                        resizeMode="contain" source={require("../../Images/QrBg.png")} >
                                        {selectedCard.cardnumber ?
                                            <Barcode value={selectedCard.cardnumber} format="CODE128" maxWidth={200} />
                                            :
                                            <ActivityIndicator size="small" color={themes.BlueColor1} />
                                        }
                                    </ImageBackground>
                                </View>
                                <Image resizeMode="contain" style={{ height: 201, width: 300, top: 30 }} source={require("../../Images/UseCard.png")} />
                            </View>
                            <View style={{ height: 90 }}>
                            </View>
                        </View>


                    </ScrollView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color:'grey'}}>Unable to generate Code. Please add a card.</Text>
                    </View>

            }


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
        marginHorizontal: 40,
        marginVertical: 15
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        left: 20,
        paddingTop: "1.5%"
    },
    whiteCard: {
        backgroundColor: '#fff',
        height: 194,
        width: 300,
        elevation: 10,
        borderRadius: 20,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

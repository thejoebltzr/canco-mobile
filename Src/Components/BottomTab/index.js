import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { themes } from '../../Constant/theme';
// import GeoLocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';

const BottomTab = ({ usecolor1, usecolor2, usecolor3, usecolor4, Img1, Img2, Img3, Img4, opc1, opc2, opc3, opc4 }) => {
    const navigation = useNavigation();
    const PressFirst = (index) => {
        if (index == 1) {
            navigation.navigate("DashboardStorePromotion")
        }
        else if (index == 2) {
            requestLocationPermission()
        }
        else if (index == 3) {
            navigation.navigate("ScanQrCode")
        }
        else if (index == 4) {
            navigation.navigate("Promotions")
        } else if (index == 5) {
            navigation.navigate("More")
        }
    }

    async function requestLocationPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    navigation.navigate("CancoLocations")
                    // GeoLocation.getCurrentPosition(
                    //     (position) => {
                    //         navigation.navigate("CancoLocations")
                    //     },
                    //     (error) => {
                    //         console.log(error)
                    //         Toast.show({
                    //             type: 'error',
                    //             text2: "Please enable your device's location",
                    //         })
                    //         return
                    //     },
                    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                    // )
                }
            } catch (err) {
                console.warn(err)
            }
        } else {
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
               authorizationLevel: 'whenInUse',
             });
            Geolocation.requestAuthorization();
            navigation.navigate("CancoLocations")
        }
    }
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={styles.bottomTabView}>
                <View style={styles.bottomTabViewInner}>
                    <TouchableOpacity onPress={() => PressFirst(1)}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ height: 24, width: 22, tintColor: usecolor1, opacity: opc1 }} resizeMode="contain" source={Img1} />
                            <Text style={{ color: usecolor1, fontSize: 10, opacity: opc1, fontFamily: themes.F2_Family1 }}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PressFirst(2)}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ height: 24, width: 18, tintColor: usecolor2, opacity: opc2 }} resizeMode="center" source={Img2} />
                            <Text style={{ color: usecolor2, fontSize: 10, opacity: opc2, fontFamily: themes.F2_Family1 }}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PressFirst(3)} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '-5%', borderRadius: 28 }}>
                            <ImageBackground source={require("../../Images/OrangeCircle.png")} style={styles.OrangeIcon}>
                                <Image style={{ height: 25, width: 27, marginTop: -6 }} resizeMode="contain" source={require("../../Images/QrCode.png")} />
                            </ImageBackground>
                            <Image style={{ width: 70, marginTop: 9, }} source={require("../../Images/Line.png")} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PressFirst(4)} >
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ height: 24, width: 22, tintColor: usecolor3, }} resizeMode="contain" source={Img3} />
                            <Text style={{ color: usecolor3, fontSize: 10, opacity: opc3, fontFamily: themes.F2_Family1 }}>Promotion</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PressFirst(5)}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ height: 24, width: 24, tintColor: usecolor4 }} resizeMode="contain" source={Img4} />
                            <Text style={{ color: usecolor4, fontSize: 10, opacity: opc4, fontFamily: themes.F2_Family1 }}>More</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomTabView: {
        height: 70,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 30,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#cdcdcd',
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
    bottomTabViewInner: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    OrangeIcon: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTabText: {
        fontFamily: themes.F2_Family1,
        color: themes.OrangeColor2,
        fontSize: 10,
    },
    bottomTabBorderLine: {
        width: "100%",
        borderWidth: 2,
        marginTop: '10%',
    }
})
export default BottomTab;
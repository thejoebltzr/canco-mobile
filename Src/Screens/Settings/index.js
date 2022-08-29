import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { themes } from '../../Constant/theme';
import { CURRENT_USER, DEFAULT_CARD, IS_LOADING, MY_CARDS } from '../../Redux/constant';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

var ww = Dimensions.get('window').width;

export default function Setting({ navigation }) {

    const { currentUser } = useSelector(({ authRed }) => authRed)

    const dispatch = useDispatch()
    const logout = () => {

        dispatch({ type: IS_LOADING, isloading: false })
        dispatch({ type: CURRENT_USER, data: null })
        dispatch({ type: DEFAULT_CARD, data: null })
        dispatch({ type: MY_CARDS, data: null })
        global.cardNumbers = null;
        try {
            messaging()
                .unsubscribeFromTopic('PromotionNotifications')
                .then(() => console.log('Unsubscribed fom the topic!'));
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            {/* <ScrollView> */}
            <View style={styles.container}>
                <View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                                <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: 2 }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Settings</Text>
                        </View>
                        {currentUser ?
                            <TouchableOpacity onPress={() => navigation.navigate("UpdateUserProfile", { photo: currentUser.line2 })}>
                                <View style={styles.profilePicMain}>
                                    {currentUser.line2 && currentUser.line2 != "undefined" ?
                                        <View style={{ overflow: 'hidden', borderRadius: 30, height: 56, width: 56 }}>
                                            <Image style={{ height: "100%", width: "100%", borderRadius: 70 }} source={{ uri: currentUser.line2 }} />
                                        </View>
                                        :
                                        <Image resizeMode="contain" style={{ height: 56, width: 56, borderRadius: 80 }} source={require("../../Images/profile2.jpg")} />}


                                    <Text style={styles.profileheading}>
                                        {currentUser.firstname} {currentUser.lastname}</Text>

                                </View>
                            </TouchableOpacity>
                            : <ActivityIndicator size="small" color="#29418A" />}
                        <View style={{ borderWidth: .5, borderColor: '#e5e5e5', marginTop: '5%' }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} scroll style={{ height: '80%' }}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/faq11.png")} />
                                        <Text style={styles.titles}>FAQs</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("TermsCondition")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/t_c.png")} />
                                        <Text style={styles.titles}>Terms and Conditions</Text>
                                    </View>

                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/Call.png")} />
                                        <Text style={styles.titles}>Contact Us</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("CancoCardWallet")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/payment1.png")} />
                                        <Text style={styles.titles}>My Card and Wallet</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("UpdateUserProfile", { photo: currentUser.line2 })}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/Profile1.png")} />
                                        <Text style={styles.titles}>Personal Information</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '10%', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/Password.png")} />
                                        <Text style={styles.titles}>Change Password</Text>
                                    </View>
                                    <Image resizeMode="contain" style={{ height: 16, width: 9, tintColor: '#6E7279' }} source={require("../../Images/rightSign.png")} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginVertical: '10%' }}>
                                <TouchableOpacity onPress={() => logout()}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <Image resizeMode="contain" style={{ height: 20, width: 20, marginEnd: 30 }} source={require("../../Images/logout.png")} />
                                        <Text style={styles.titles}>LOG OUT</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{height:50 }}></View>
                        </View>
                    </ScrollView>

                </View>
            </View>
            {/* </ScrollView> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginVertical: 45
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "5%",
        marginTop:"1%"
    },
    profilePicMain: {
        marginTop: "15%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileheading: {
        fontSize: 30,
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        paddingLeft: "5%"
    },
    titles: {
        fontSize: 16,
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1
    }
})

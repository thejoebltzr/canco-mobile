import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import { formatAmount } from '../../Utility/Utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function ItemDescription({ route }) {
    var height = Dimensions.get('window').height;
    const navigation = useNavigation();
 
    const { Id, name, image, price, detail, message } = route.params
     const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop: insets.top , backgroundColor: themes.OrangeColor2}}>
            <View style={[styles.OrangeHeader], { height: height / 5, backgroundColor: themes.OrangeColor2 }}>
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 20, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center" }} >
                        <Image style={{ height: 15, width: 20, marginLeft: '10%', marginTop: '-5%', tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>{name}</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("SearchItem")}   >
                        <Image style={{ height: 24, width: 20,  tintColor: '#fff', }} resizeMode="contain" source={require("../../Images/search.png")} />
                    </TouchableOpacity>


                </View>
            </View>
            <View style={styles.whiteSheet}>
                < Animatable.Image animation="bounceInLeft" direction="normal" style={{ height: 41, width: 50, marginTop: 25, alignSelf: 'center', marginBottom: 10 }} resizeMode="contain" source={require("../../Images/cancoIcon1.png")} />
                <ScrollView >
                    <View style={{ width: "98%" }}>
                        <Text style={{ fontSize: 18, fontFamily: themes.F2_Family1, textAlign: 'center', lineHeight: 20, paddingTop: 10 }}> {message}
                            <Text style={{ fontFamily: themes.F1_Family2 }}>
                                {" "}{name} </Text>for <Text style={{ fontFamily: themes.F1_Family2 }}>
                                {formatAmount(price)}</Text></Text>
                    </View>
                    <View style={{}}>
                        <Image resizeMode='contain' style={{ alignSelf: 'center', height: 300, width: 250, }} source={{ uri: image }} />
                    </View>

                    <View style={{ marginBottom: '75%', width: '94%', alignSelf: 'center' }}>
                        <Text style={styles.description}>
                            {detail}
                        </Text>
                    </View>
                    <View style={{}} />
                </ScrollView>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    OrangeHeader: {
        color: '#fff'
    },
    heading1: {
        fontSize: 22,
        color: "#fff",
        fontFamily: themes.F2_Family1,
        // paddingLeft: '4%',
        width: "84%",
        lineHeight: 25

    },
    whiteSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: "-10%",
        // alignItems: 'center',
        height: '100%'
    },
    subHeading: {
        textAlign: 'center',
        top: 10,
        fontFamily: themes.F2_Family1,
        fontSize: 18,
        lineHeight: 22,
        paddingRight: '55%'
    },
    description: {
        fontFamily: themes.F2_Family1,
        color: "#000",
        opacity: .6,
        fontSize: 16,
        paddingLeft: 5,
        lineHeight: 25
    }
})
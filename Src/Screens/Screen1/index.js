import React, { Component, useState, useEffect } from 'react';
import { View, Text, ImageBackground,BackHandler, Image, Dimensions, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { themes } from '../../Constant/theme';

const zoomOut = {
  1: {
    scale: 1,
  },
  0.5: {
    scale: 0.3,
  },
  0: {
    scale: 0,
  },
};
var imgH = 40
var imgHvar = 218
var imgWvar = 276
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
export default function splash({ navigation }) {
  const [btmMrg, setBtmMrg] = useState((windowHeight * 40) / 100);
  const [imgHe, setImgHe] = useState(218);
  const [imgW, setImgW] = useState(276);
  const [showView, setShowView] = useState(false);
  const [opacityState, setOpacityState] = useState(0.5)

  useEffect(() => {
    setTimeout(() => {
      var interval = setInterval(() => {
        imgH = imgH + 2.2;
        imgHvar = imgHvar - 7.0;
        imgWvar = imgWvar - 7.7;

        var heightVar = (windowHeight * imgH) / 105;
        if (imgWvar > 117) {
          setImgW(imgWvar)
        }
        if (imgHvar > 93) {
          setImgHe(imgHvar)
        }
        if (imgH < 80) {
          setBtmMrg(heightVar)
        }
        else {
          setShowView(true)
          clearInterval(interval)
        }
      }, 1);
    }, 500);
    const backAction = () => {
      imgH =  40;
      imgHvar = 218
      imgWvar = 276
      BackHandler.exitApp()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  },[]);
  function registrationNavigation() {
    navigation.navigate("RegisterScreen",{fname:"",lname:"",Emaill:""})
    imgH = 40;
    imgHvar = 218
    imgWvar = 276
  }
  function loginNavigation() {
    navigation.navigate("Login")
    imgH = 40;
    imgHvar = 218
    imgWvar = 276
  }

  return (
    <ImageBackground source={require('../../Images/S_ScreenMain.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.Image animation={zoomOut}
        source={require("../../Images/cancoLogo.png")}
        style={{ zIndex: 1, height: imgHe, width: imgW, position: 'absolute', bottom: btmMrg }}>
      </Animatable.Image>
      {showView == true ?
        <View style={{ height: '47%', width: 300, alignSelf: "center", }}>
          <Image resizeMode="contain" style={{ alignSelf: 'center', marginTop: '-17%' }} source={require('../../Images/SplashLogo.png')} />
          <Image style={{ height: 100, width: 320, alignSelf: 'center',marginTop:-10 }} resizeMode="contain" source={require('../../Images/Savingsbeginhere!.png')} />
          <View style={{ width: '100%', justifyContent: "space-between", height: windowHeight / 9, flexDirection: 'column', position: 'absolute', bottom: "-23%" }}>
            <TouchableOpacity style={styles.button1} onPress={() => loginNavigation()}>
              <Text style={styles.button1text}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => registrationNavigation()} style={[styles.button2]}>
              <Text style={styles.button1text}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        : null}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  button1: {
    backgroundColor: themes.OrangeColor2,
    color: themes.textInputColor,
    height: 60,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: "#384f96",
    color: themes.textInputColor,
    height: 60,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: windowHeight / 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  button1text: {
    color: "#fff",
    fontFamily: themes.F2_Family1,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1
  }
})


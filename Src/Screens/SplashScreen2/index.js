import * as React from 'react';
import {useEffect} from 'react';
import { ImageBackground,View,Text } from 'react-native';
import * as Animatable from 'react-native-animatable';


const SplashScreen2 = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DashboardStorePromotion')
        }, 100);
    });
    return ( 
        // <View>
    <ImageBackground   source={require("../../Images/Transition.png")} style={{ flex: 1 }}>
        </ImageBackground>
        // {/* </View> */}
        
        
    );
};

export default SplashScreen2;
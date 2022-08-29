import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ImageBackground, View} from 'react-native';
import { useState } from 'react';
import DashboardStorePromotion from '../../Screens/DashboardStorePromotion';
import AddCancoCard from '../../Screens/AddCancoCard';
import More from '../../Screens/More';

const Tab = createBottomTabNavigator();
export default function MyTabs({ }) {
  return (
    <Tab.Navigator initialRouteName="ItemDescription"
      tabBarOptions={{
        activeTintColor: "#FF9269",
        inactiveTintColor: '#18243C',
        elevation:70,
        style: {
          backgroundColor: 'white',
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
          height: 70,
        },
        labelStyle: {
          fontSize: 16,
          fontFamily: "MyriadPro",
          marginBottom: 20
        },
      }} >
      <Tab.Screen 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image resizeMode="contain" style={{ height: 23, width: 23, tintColor: color }} source={require("../../Images/Home.png")} />),
        }}
        name="DashboardStorePromotion" component={DashboardStorePromotion} />
      <Tab.Screen 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <ImageBackground style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} source={require("../../Images/OrangeCircle.png")}>
                <Image resizeMode="contain" style={{ height: 25, width: 27, tintColor: "red", marginTop: -2 }} source={require("../../Images/QrCode.png")} />
              </ImageBackground>
              <Image resizeMode="contain" style={{ width: 100, marginTop: 10, position: "relative" }} source={require("../../Images/Line.png")} />
            </View>
          ),
        }} 
        name="AddCancoCard" 
        component={AddCancoCard} />
      <Tab.Screen 
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <Image resizeMode="contain" style={{ height: 23, width: 23, tintColor: color, }} source={require("../../Images/More.png")} />
          ),
        }} 
        name="More" 
        component={More} />
    </Tab.Navigator>
  );
}

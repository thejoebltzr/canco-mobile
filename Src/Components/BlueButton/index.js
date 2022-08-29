import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import { themes } from '../../Constant/theme';

const BlueButton = ({title,onPress,loader}) => {
    return <View>
        <TouchableOpacity disabled={loader ? true : false} style={styles.button1}  onPress={onPress}>
            {loader == false ?
            <Text style={styles.button1text}>
                {title}
            </Text>
             : 
             <ActivityIndicator size="small" color="#fff" /> 
            }
    
        </TouchableOpacity>
    </View>

};
const styles = StyleSheet.create({
    button1: {
        backgroundColor: themes.Button,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        marginVertical: 8
    },
    button1text: {
        color: "#fff",
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 1
    }
})
export default BlueButton;
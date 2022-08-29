import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { themes } from '../../Constant/theme';

const InputField = props => {
    // console.log(props);
    return <View>
        <View>
            <Text style={styles.text3}>{props.title}</Text>
            <TextInput style={styles.textinput1} 
            // keyboardType=""
            secureTextEntry={props.secureTextEntry}
            editable={props.editable}
            
             keyboardType={props.keyboardType}
            // keyboardType="email-address"
               onChangeText={props.onChangeText} value={props.value}   placeholder={props.placeholder} placeholderTextColor="#929292" />
        </View>
    </View>

};
const styles = StyleSheet.create({
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    textinput1: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        
        
        fontFamily:themes.F2_Family1,
        height: 60,
        width: '100%',
        borderRadius: 30,
        paddingHorizontal: 30,
        
    },
});
export default InputField

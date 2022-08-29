import * as React from 'react';
import { List } from 'react-native-paper';
import { Image, FlatList, View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';

const Help = ({ navigation }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    
    return (
        <View style={{ backgroundColor: themes.OrangeColor2, flex: 1 }}>
            {/* <View style={styles.orangeView}> */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                        <Image style={{ height: 15, width: 20, marginLeft: '20%',  tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>Help</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.heading2}>How can we{"\n"}help you?</Text>
                    <Image style={{ height: 134, width: 140 }} resizeMode="contain" source={require("../../Images/HELP1.png")} />
                </View>
                {/* </View> */}
                <Text style={styles.des}>We are happy to help you. If you want for assitance, you can ask for the information you want to know, click on the link and contact us and we will help you.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ContactUs')} style={{ height: 36, width: 100, justifyContent: "center", alignItems: "center" , marginLeft:25}} >
                <Text style={styles.des2}>Click here</Text> 
                </TouchableOpacity>         
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    titleBox: {
        marginLeft: "-25%",
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        fontSize: 18,
    },
    description: {
        marginLeft: "-20%",
        fontFamily: themes.F2_Family1,
        color: "#000",
        fontSize: 14,
        lineHeight: 25,
    },
    orangeView: {
        backgroundColor: themes.OrangeColor2,
        // height:'35%'
    },
    container: {
        marginVertical: 40,
        marginHorizontal: 10,
    },
    container1: {
        marginHorizontal: 15,
        // marginTop: '2%',
    },
    heading1: {
        fontSize: 22,
        color: "#fff",
        fontFamily: themes.F2_Family1,
        paddingLeft:"5%"
    },
    whiteView: {
        borderRadius: 50,
        backgroundColor: '#fff',
        marginTop: '-13%',
        height: '100%',
        width: '100%',

    },
    heading2: {
        fontSize: 36,
        fontFamily: themes.F2_Family2,
        color: "#fff",
        paddingLeft: '7%',
        paddingTop: '5%',
        lineHeight: 36
    },
    des:{
        fontSize:20,
        fontFamily: themes.F2_Family2,
        color:"#fff",
        padding:"10%",
        lineHeight:40
    },
    des2:{
        fontSize:20,
        textDecorationLine:"underline",
        fontFamily: themes.F2_Family2,
        color:"#fff",
        paddingLeft:"10%",
        
        lineHeight:40
    }
})
export default Help;
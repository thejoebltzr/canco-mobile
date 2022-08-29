import * as React from 'react';
import { List } from 'react-native-paper';
import { Image, FlatList, View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';

const FAQ = ({ navigation }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const Test = [
        {
            id: 1,
            title: 'Where can I use my Canco Cash Card?',
            description: 'Canco Cash Card can be used at any Canco / OneStop / Canco Supermarket locations. Just scan the barcode at the time of checkout and enjoy the savings!'
        },
        {
            id: 2,
            title: 'How much do I save with Canco Cash Card?',
            description: 'You will get 2c off/litre back on your Canco Cash Card, 2% on in-store purchases* and 1% back on lottery.'
        },
        {
            id: 3,
            title: 'Is there any Canco gas station around my area?',
            description: 'Browse to https://cancopetroleum.ca/gas-stations/ to get the list of all the Canco locations throughout Canada'
        },
        {
            id: 4,
            title: 'How can I check my Canco Cash balance?',
            description: 'Canco Cash balance is displayed at on the home screen of the app. You can also sign in into cancopetroeum.ca to check the card balance.'
        },
        {
            id: 5,
            title: 'How can I transfer my balance to a different card?',
            description: 'To transfer your balance to another card, browse to More -> Transfer funds. Select the To and From Canco cards and click ‘transfer’.'
        },
        {
            id: 6,
            title: 'I forgot to scan my Canco Cash Card at the store, what do I do?',
            description: 'You can always submit the receipts to earn Canco Cash in the ‘Missing Points?’ section for all transactions less than 15 days old.'
        },

        
    ]
    return (
        <View style={{ backgroundColor: themes.OrangeColor2, flex: 1 }}>
            {/* <View style={styles.orangeView}> */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                        <Image style={{ height: 15, width: 20, marginLeft: '20%',  tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>FAQs</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.heading2}>How can we{"\n"}help you?</Text>
                    <Image style={{ height: 134, width: 140 }} resizeMode="contain" source={require("../../Images/FAQ1.png")} />
                </View>
                {/* </View> */}

            </View>
            <View style={{  backgroundColor:'#fff',width: '100%', height: '77%',borderTopLeftRadius:25,borderTopRightRadius:25,marginTop:'-10%' }}>
                <ScrollView>
                    <View style={styles.container1}>
                        <View style={{marginTop:"5%"}}></View>
                        <FlatList
                            data={Test}
                            renderItem={({ item, index }) =>
                                <View style={{ marginTop: 10 }} >
                                    <List.Section style={{}}  >
                                        <List.Accordion
                                            style={{ backgroundColor: "#fff" }}
                                            title={item.title}
                                            titleStyle={styles.titleBox}
                                            
                                            titleNumberOfLines={2}
                                            left={props =>
                                                <List.Icon {...props}
                                                />}>
                                            <List.Item
                                                titleStyle={styles.description} titleNumberOfLines={6} title={item.description} />
                                        </List.Accordion>
                                    </List.Section>
                                    <View style={{ borderWidth: .5, borderColor: "#dfdfdf", width: "90%", alignSelf: 'center' }} />
                                </View>
                            }
                            keyExtractor={item => item.id} />
                        <View style={{ height: 50 }} />
                    </View>

                </ScrollView>
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
        paddingLeft: '2%',
        paddingTop: '5%',
        lineHeight: 36
    }
})
export default FAQ;
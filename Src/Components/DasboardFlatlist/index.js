import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { themes } from '../../Constant/theme';

export default function DashboardComponent() {
    const DATA = [
        {
            id: '1',
            image: require('../../Images/redBull.png'),
            Productname: 'Coffeee and \n 2 pcs Bread',
            range: 'Upto 100 Points',
            price: '-$8.99'
        },
        {
            id: '2',
            image: require('../../Images/coke.png'),
            Productname: 'Coffeee and 2 pcs Bread',
            range: 'Upto 500 Points',
            price: '-$8.99'
        },
        {
            id: '3',
            image: require('../../Images/coffe.png'),
            Productname: 'Coffeee and 2 pcs Bread',
            range: 'Upto 900 Points',
            price: '-$8.99'
        },
        {
            id: '4',
            image: require('../../Images/monster2.png'),
            Productname: 'Coffeee and 2 pcs Bread',
            range: 'Upto 200 Points',
            price: '-$8.99'
        }
    ]
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={{ marginTop: '5%', marginHorizontal: 5, marginVertical:100 }}>
                    <FlatList
                        // horizontal="true"
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={DATA}
                        renderItem={({ item, index }) =>
                            <View>
                                <Pressable >
                                    <View style={{ height: 230, width: 136, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', elevation: 8, shadowOffset: 20, marginTop: 15 }}>
                                        <Image resizeMode="contain" source={item.image} style={styles.productImage}  >
                                        </Image>
                                        <Text style={styles.productname}>{item.Productname}</Text>
                                        <Text style={styles.range}>{item.range}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                    </View>
                                </Pressable>
                            </View>}
                        keyExtractor={item => item.id} />
                </View>
            </View>
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
        paddingLeft: "6%"
    },
    subHeading: {
        fontSize: 20,
        fontFamily: themes.F2_Family2,
        paddingTop: "6%"
    },
    productImage: {
        height: 96,
        width: 99,
        marginTop: 5
    },
    productname: {
        fontSize: 14,
        fontFamily: themes.F2_Family2,
        lineHeight: 17,
        color: themes.BlueColor1,
        textAlign: 'center',
        // fontWeight:'700'
    },
    range: {
        color: "#000000",
        fontSize: 10,
        lineHeight: 12,
        fontFamily: themes.F2_Family1,
        paddingTop: "25%"
    },
    price: {
        fontFamily: themes.F2_Family1,
        fontSize: 16,
        textAlign: 'center',
        color: themes.BlueColor1,
        paddingTop: "10%"
    }

})

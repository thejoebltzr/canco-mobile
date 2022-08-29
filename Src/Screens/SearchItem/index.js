import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import React, {  useState } from 'react';
import { themes } from '../../Constant/theme';
import { SearchBar } from 'react-native-elements';
import { useSelector } from "react-redux";
import moment from "moment";
import { formatAmount } from '../../Utility/Utils';
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchItemPage({ route }) {
    const navigation = useNavigation();
    const [search, updateSearch] = useState('');
   
    const { storeUpcomingPromotion, storeCurrentPromotion, token, loading } = useSelector(({ authRed }) => authRed)
    const [searchResults, setSearchResults] = useState([]);

    const insets = useSafeAreaInsets();

    const filterResults = (text) => {
        var data = [];
        
        const searchItems =  storeCurrentPromotion.concat(storeUpcomingPromotion);
        if (searchItems && text.length > 0) {
            data = searchItems.filter((promotion) => {
                return promotion.promoName.toLowerCase().includes(text.toLowerCase());
            })
        }

        setSearchResults(data);
        updateSearch(text)

    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 , paddingTop: insets.top }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 54, marginRight: 8, justifyContent: "center", alignItems: "center" }} >
                        <Image resizeMode="contain" style={{ height: 25, width: 25, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>

                    <View style={{ flex: 2 }}>
                        <SearchBar
                            placeholder="Search Item"
                            value={search}
                            round
                            searchIcon={false}
                            containerStyle={styles.searchContainer}
                            inputContainerStyle={styles.inputContainer}
                            lightTheme
                            autoFocus
                            onChangeText={
                                (text) => filterResults(text)
                            }
                        />
                    </View>
                </View>
                {
                    (searchResults.length > 0) ?
                        <FlatList
                            data={searchResults}
                            renderItem={({ item, index }) =>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion, message: item.message, })}>
                                        <View style={styles.fullView}>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                                <View style={styles.flatlistLogo}>
                                                    <Image resizeMode="contain" style={styles.Logo} source={{ uri: item.promoImage }} />
                                                </View>
                                                <View style={styles.fullViewInner}>
                                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: themes.F2_Family1, fontWeight: '700' }}>{item.promoName}</Text>
                                                    <Text style={{ color: "#000", fontSize: 12, fontFamily: themes.F2_Family1, paddingTop: 2, opacity: .4 }}>Effective from {moment(item.effectiveDate).format("MMM D")}</Text>
                                                </View>
                                            </View>
                                            <View style={{}}>
                                                <Text style={{ color: "#000", fontSize: 14, fontFamily: themes.F2_Family1, fontWeight: '700' }}>{formatAmount(item.price)}</Text>
                                                <Text style={{ color: "#000", fontSize: 12, fontFamily: themes.F2_Family1, paddingTop: 2, opacity: .4, alignSelf: 'flex-end' }}>{item.multiplyer}x</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>}
                            keyExtractor={item => item.id}
                        />
                        : search != '' ? <View style={styles.noResults}><Text style={styles.noResultText}>No Items found</Text></View> : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 18,
        marginTop: 20
    },
    head: {
        flexDirection: 'row',
    },
    flatListImage: {
        height: 185,
        width: 275,
        borderRadius: 30
    },

    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    fullView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: "center"
    },
    Logo: {
        height: 31,
        width: 31,
    },
    fullViewInner: {
        marginLeft: '5%',
        width: '60%'
    },
    location: {
        height: 10,
        width: 9,
        tintColor: '#808080'
    },
    flatlistLogo: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: themes.TextInputBGC,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fullViewInner: {
        marginLeft: '5%',
        width: '60%'
    },

    flatlistLogo: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: themes.TextInputBGC,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        color: 'red',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,

    },
    noResults: {
        alignItems: 'center',
        height: 500,
        justifyContent: 'center',

    },
    noResultText: {
        fontSize: 24,
        color: 'grey'
    }

})

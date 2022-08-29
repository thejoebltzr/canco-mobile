import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import React, {  useState } from 'react';
import { themes } from '../../Constant/theme';
import { SearchBar } from 'react-native-elements';
import { useSelector } from "react-redux";
import moment from "moment";
import { formatAmount } from '../../Utility/Utils';
import { useNavigation } from "@react-navigation/native";


export default function SearchNotification({ route }) {
    const navigation = useNavigation();
    const [search, updateSearch] = useState('');
   
    const { storeUpcomingPromotion, storeCurrentPromotion, token, loading } = useSelector(({ authRed }) => authRed)
    const [searchResults, setSearchResults] = useState([]);
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
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 54, marginRight: 8, justifyContent: "center", alignItems: "center" }} >
                        <Image resizeMode="contain" style={{ height: 25, width: 25, marginTop: 5 }} source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>

                    <View style={{ flex: 2 }}>
                        <SearchBar
                            placeholder="Search Notification"
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
                    nestedScrollEnabled={true}
                    ListFooterComponent={() => <View/>}                            
                    initialNumToRender={4}
                    style={{height:"100%"}}
                    data={searchResults}
                    renderItem={({ item, index }) =>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion,message:item.message })}  >
                                <View style={{}}>
                                    <View style={styles.fullView}>
                                        <View style={[styles.fullView2]}>
                                            <View style={{ backgroundColor: '#f3f3f3', borderRadius: 30, height: 55, width: 55, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image resizeMode="contain" style={styles.cancoLogo} source={{ uri: item.promoImage }} />
                                            </View>
                                            <View style={[styles.fullViewInner], { width: "80%", marginLeft: 7, marginTop: 1 }}>
                                                    <Text>
                                                    <Text style={styles.notify}>{item.message}</Text>
                                                        <Text style={[styles.notify], { fontFamily: themes.F2_Family2 }}> {item.promoName}
                                                        </Text>
                                                        <Text> for</Text> <Text style={{ fontFamily: themes.F2_Family2 }}> ${item.price}
                                                        </Text>
                                                        <Text style={{fontFamily: themes.F2_Family1 }}>. Click here for more info</Text>
                                                    </Text>
                                                <Text style={{ fontSize: 12, lineHeight: 20, color: "#8f92a1", fontFamily: themes.F2_Family1 }}>{moment(item.dateCreated).startOf("hour").fromNow()} </Text>
                                            </View>
                                            {/* <TouchableOpacity onPress={() => navigation.navigate("ItemDescription", { Id: item.promoId, name: item.promoName, price: item.price, image: item.promoImage, detail: item.productInclusion,message:item.message })}>
                                             <View style={{ backgroundColor: '#f3f3f3',  height: 10, width: 55, justifyContent: 'center', alignItems: 'center' }}>
                                                   <Image resizeMode="contain" style={styles.threedots} source={require("../../Images/3dots.png")}></Image>
                                             </View>
                                             </TouchableOpacity> */}
                                        </View>
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
        marginTop: 40,
     
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
        // alignItems: 'center',
        // width: '97=%',
        // backgroundColor:'yellow'
    },

    fullView2: {
        flexDirection: 'row',
        // marginTop: 15,
        alignItems: 'center',
        // backgroundColor:'yellow',
        // width: '90%',
        paddingHorizontal: 15,
        // backgroundColor:'red'
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
        borderRadius: 20,
        backgroundColor: themes.TextInputBGC,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fullViewInner: {
        marginLeft: '5%',
        width: '60%'
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
    },
    SearchInputStyle:{
        flex:1,
        fontSize:16,
        paddingVertical:8,
        paddingHorizontal:0,
        margin:0,
        color:"white", 
               
    },
    cancoLogo: {
        height: 40,
        width: 40,
        marginLeft: 2,
    },
    threedots: {
        height: 40,
        width: 40,
        marginLeft: 2,
    },

})

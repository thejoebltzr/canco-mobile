import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Keyboard, Modal, Pressable, ImageBackground, FlatList, Linking, Button, Platform } from 'react-native';
import { themes } from '../../Constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, Icon } from 'react-native-elements';
import { getCancoLocations, getLocation, GetSpecificLocation } from '../../Redux/action/index'
import MapView, { Marker } from 'react-native-maps';
import BottomTab from '../../Components/BottomTab';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ActivityIndicator } from 'react-native-paper';
import { getDistance } from 'geolib';
import moment from "moment";
import GeoLocation from 'react-native-geolocation-service';
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
import { GOOGLE_MAP_API_KEY, TEST_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LOCATIONPARAMS } from '../../Redux/constant';
 
export default function CancoLocations({ navigation }) {

    const dispatch = useDispatch();
    const { token, getLocationParams, getspecifyLocation, customArray, loading } = useSelector(({ authRed }) => authRed)
    const mapRef = useRef()
    const refRBSheet = useRef();
    const [isMapReady, setMapReady] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState();
    const [distanceKm, setdistanceKm] = useState("")
    const [showView, setshowView] = useState(false)
    const [userLat, setUserLat] = useState();
    const [userLng, setUserLng] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [amenities, setAmenties] = useState([
        { name: "Convenience Store", checked: false },
        { name: "Regular Gas", checked: false },
        { name: "Diesel", checked: false },
        { name: "Premium Gas", checked: false },
        { name: "Propane", checked: false },
        { name: "Car Wash", checked: false },
        { name: "ATM", checked: false },
        { name: "Liquor", checked: false },
    ])
    const [query, setquery] = useState("")
    const data = filterData(query);
    const autoCompleteRef = useRef();

    const [cancoLocations, setCancoLocations] = useState(getLocationParams);
 
    useEffect(() => {
        getAllCancoLocations()
    }, []);

    async function getAllCancoLocations() {
        try {
            const data = await getCancoLocations(token);
            console.log('data::', data.length)
            setCancoLocations(data);
            dispatch({ type: LOCATIONPARAMS, data: data })
        } catch (err) {
            console.log(err)
        }
    }

    //Function to call if map is ready
    const onMapReady = () => {
        console.log("api key::", GOOGLE_MAP_API_KEY)
        // 
        setMapReady(true)

        initializeLocations();

        //Get current location to set directions
        GeoLocation.getCurrentPosition(info => {
            setUserLat(info.coords.latitude), setUserLng(info.coords.longitude)
        },

            (error) => {
                if (error.message === "No location provider available.") {
                }
            },
        )
    }

    // show directions - this will open google maps app to draw directions
    const showDirections = async (location) => {

        var url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${location.latitude},${location.longitude}`;
        console.log("location", url)

        Linking.openURL(url);
    }

    const openLocation = (loc) => {
        console.log("location",loc)
        var url = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
        console.log("URL",url)
        Alert.alert(
            '',
            'Click "SAVE" after redirecting to the location',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => Linking.openURL(url) },
            ]
        );

    }

    //select location from search results
    const selectLocation = (item) => {
        Keyboard.dismiss()


        mapRef.current.animateToRegion({
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        })
        // setquery("");
        autoCompleteRef.current.setAddressText("");
    }


    //set values to locations when map is ready
    const initializeLocations = () => {
        if (cancoLocations) {
            setLocations(cancoLocations)
            fitAllMarkers(cancoLocations)
           
        }
    }

    //Show all markers on map load
    const fitAllMarkers = (locationData) => {
        const markers = locationData.map((location) => {
            return {
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude)
            }
        })

        mapRef.current.fitToCoordinates(markers,
            {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
    }

    //Function for filtering locations using search bar
    function filterData(query) {
        var data = [];
        if (cancoLocations && query.length > 0) {
            var data = cancoLocations.filter(function search(location) {
                return location.businessName.toLowerCase().includes(query.toLowerCase());
            })
        }
        return data;
    }

    //Filter by amenities
    function filterLocationsByAmenities() {
        let selectedAmenties = amenities.filter(a => a?.checked == true)
        selectedAmenties = selectedAmenties.map((a) => a.name);

        let res = getLocationParams.filter(l => selectedAmenties.every(a => l.amenityIds.includes(a)))
        
        setLocations(res)
        setCancoLocations(res)
        fitAllMarkers(res)
        setModalVisible(!modalVisible)
    }

    function ifFilteredByAmenitiesChecked() {
        return amenities.find((amenity) => amenity.checked == true)
    }

    function showBusinessDetails(location) {
        //Calculate distance between user's location and canco business location
        console.log("user coords", userLat, userLng, "destination:", location)

        setshowView(false)
        setdistanceKm(getDistance(
            { latitude: parseFloat(userLat), longitude: parseFloat(userLng) },
            { latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }
        ))
        refRBSheet.current.open()
        // API call to get location/business details
        dispatch(GetSpecificLocation(token, location.locationId))

    }



    //Check filters
    function checkFilterItem(index) {
        let clone = [...amenities];
        clone[index].checked = !clone[index].checked;
        setAmenties(clone)
    }

    const kmToMiles = (km) => {
        var miles = (km * 0.621371);
        return miles.toFixed(2);
    }

    //Get amenity icon
    function getAmenityIcon(amenity) {
    
        switch (amenity.toLowerCase()) {
            case "convenience store":
                return require("../../Images/store1.png")
            case "regular gas":
                return require("../../Images/gas1.png")
            case "premium gas":
                return require("../../Images/gas2.png")
            case "diesel":
                return require("../../Images/gas3.png")
            case "propane":
                return require("../../Images/propane1.png")
            case "car wash":
                return require("../../Images/carwash.png")
            case "atm":
                return require("../../Images/atm.png")
            case "liquor":
                return require("../../Images/liquor1.png")

        }
    }
    return (

        <View style={{ flex: 1 }}>
            {
                cancoLocations ?
                    <View style={styles.container}>

                        {/* MapView Element*/}
                        <MapView
                            onMapReady={onMapReady}
                            ref={mapRef}
                            style={styles.mapStyle}
                            zoomEnabled={true}
                        >
                            {/* Display Location Markers */}
                            {
                                (isMapReady && cancoLocations && cancoLocations.length > 0) ?
                                    cancoLocations.map((item, element) => (
                                        <Marker
                                            key={
                                                item.locationId
                                            }
                                            coordinate={{
                                                latitude: parseFloat(item.latitude),
                                                longitude: parseFloat(item.longitude)
                                            }}
                                            onPress={() => {
                                                console.log("Marker clicked!")
                                                console.log("LOCATION DETALS", item)
                                                setSelectedLocation(item.locationId)
                                                showBusinessDetails(item);
                                            }}
                                        >
                                            {selectedLocation == item.locationId ?
                                                <Image source={require("../../../Src/Images/MapMarker2.png")} style={{ height: 50, width: 50 }} resizeMode="contain"></Image> :
                                                <Image source={require("../../../Src/Images/MapMarker1.png")} style={{ height: 50, width: 50 }} resizeMode="contain"></Image>
                                            }

                                        </Marker>
                                    ))
                                    : null
                            }
                        </MapView>

                        {/* Google Places Input */}
                        <View style={styles.autocompleteContainer}>
                            <GooglePlacesAutocomplete
                                ref={autoCompleteRef}
                                placeholder='Search Location'
                                fetchDetails
                                onPress={(data, details = null) => {
                                    selectLocation(details.geometry.location)
                                }}
                                query={{
                                    // key: GOOGLE_MAP_API_KEY,
                                    key: "AIzaSyDGvUc1ExeDlqQMGvo0wi9HgFWbzE8orcg",
                                    language: 'en',
                                }}
                                styles={{
                                    textInput: {
                                        borderRadius: 40,
                                        backgroundColor: 'white',
                                        borderWidth: 0.5,
                                        borderColor: '#D6D6D6',
                                        height: 58,
                                        color: 'black'
                                    },
                                }}

                            />

                            <View style={{
                                position: 'absolute',
                                right: 0,
                                top: 6,
                                flexDirection: 'row'
                            }}>
                                <Text style={{ color: "#dbdbdb", fontSize: 27, marginTop: 5, marginRight: 6 }}>|</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Image style={{ height: 30, width: 30, marginRight: "6%", marginTop: 10, tintColor: "#898a8d" }} source={require("../../Images/filters.png")} />
                                </TouchableOpacity>
                            </View>



                        </View>

                        <View>
                            {/* Bottom Sheet to show business details */}
                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                animationType="slide"
                                height={550}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent",
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#e7e7e7",
                                        width: '25%'
                                    },
                                    container: {
                                        borderRadius: 25
                                    }
                                }}>
                                {getspecifyLocation ?
                                    <View style={{ flex: 1 }}>
                                        {loading ?
                                            <ActivityIndicator style={{ alignSelf: 'center', marginTop: '70%' }} size="large" color={themes.OrangeColor2} />
                                            :
                                            <ScrollView>
                                                <View style={styles.SheetContainer}>
                                                    <Image style={{ height: 200, width: "100%", borderRadius: 25 }} source={getspecifyLocation.Location[0].storeImage != '' ? { uri: getspecifyLocation.Location[0].storeImage } : require("../../Images/CancoStore.png")} />
                                                    <Text style={styles.businessname}>
                                                        {getspecifyLocation.Location[0].businessName}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Image style={{ height: 17, width: 15, opacity: .4 }} source={require("../../Images/Location.png")} resizeMode="contain" ></Image>
                                                            <Text style={styles.text2}>{kmToMiles(distanceKm / 1000)}  Miles
                                                                <Text style={{}}> {" "} {Math.round((((distanceKm / 1000) * 0.01) * 60).toFixed(1))} Min Drive</Text>
                                                            </Text>
                                                        </View>

                                                        <TouchableOpacity onPress={() => openLocation(getspecifyLocation.Location[0])}>
                                                            <ImageBackground style={{ height: 50, width: 50, opacity: .3, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/pinkRect.png")} resizeMode="contain" >
                                                                <Image style={{ height: 23, width: 15 }} source={require("../../Images/bookMark.png")} resizeMode="contain" ></Image>
                                                            </ImageBackground>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image style={{ height: 17, width: 15, opacity: .4 }} source={require("../../Images/clock.png")} resizeMode="contain" ></Image>

                                                        {getspecifyLocation.Location[0].is24By7 == "1" && getspecifyLocation.StoreHours.length < 1
                                                            ?
                                                            <Text style={styles.text2}>
                                                                24/7  </Text> : <View style={{ flexDirection: 'row' }}>

                                                                {
                                                                     getspecifyLocation.StoreHours  ?
                                                                        <Text style={styles.text2}>
                                                                            Opens at {moment(getspecifyLocation.StoreHours[0]?.timeFrom, "HH:mm:ss").format('hh:mm a')}
                                                                            <Text style={{}}> | {getspecifyLocation.StoreHours[0].day.toUpperCase()} -  {getspecifyLocation.StoreHours[getspecifyLocation.StoreHours.length - 1].day.toUpperCase()} </Text>
                                                                        </Text> : {}
                                                                }
                                                                {showView == true ?
                                                                    <TouchableOpacity onPress={() => setshowView(false)}>
                                                                        <Image resizeMode="contain" style={{ height: 12, width: 12, alignSelf: "center", marginLeft: '5%', tintColor: themes.OrangeColor2, marginTop: 3 }} source={require("../../Images/downArrow.png")} />
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity onPress={() => setshowView(true)}>
                                                                        <Image resizeMode="contain" style={{ height: 13, width: 13, alignSelf: "center", marginLeft: '5%', tintColor: "#929292", marginTop: 3 }} source={require("../../Images/rightArrow.png")} />
                                                                    </TouchableOpacity>}
                                                            </View>
                                                        }

                                                    </View>

                                                    {showView == false ?
                                                        <Pressable onPress={() => setshowView(true)}>
                                                        </Pressable>
                                                        :
                                                        <Pressable onPress={() => setshowView(false)}>
                                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                <View style={{ width: "35%", paddingLeft: 1 }}>
                                                                    <Text style={{ fontFamily: themes.F2_Family2, opacity: .8, color: themes.BlueColor1 }}>Days </Text>
                                                                </View>
                                                                <View style={{ width: "35%", alignItems: 'center' }}>
                                                                    <Text style={{ fontFamily: themes.F2_Family2, opacity: .8, color: themes.BlueColor1 }}>From </Text>
                                                                </View>
                                                                <View style={{ width: '20%', alignItems: "center" }}>
                                                                    <Text style={{ fontFamily: themes.F2_Family2, opacity: .8, color: themes.BlueColor1 }}>To </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ justifyContent: 'space-between' }}>
                                                                <View style={{ flexDirection: 'column' }}>
                                                                    {
                                                                        getspecifyLocation.StoreHours.map((store, i) => (
                                                                            <View style={{ flexDirection: 'row', marginTop: 5 }} key={i}>
                                                                                <View style={{ width: "35%" }}>
                                                                                    <Text style={styles.text2}>
                                                                                        <Text>{store.day}</Text>
                                                                                    </Text>
                                                                                </View>
                                                                                <View style={{ width: "35%", alignItems: 'center' }}>
                                                                                    <Text style={styles.text2}>{moment(store.timeFrom, "HH:mm:ss").format('hh:mm a')} </Text>
                                                                                </View>
                                                                                <View style={{ width: '20%', alignItems: "center" }}>
                                                                                    <Text style={styles.text2}>{moment(store.timeTo, "HH:mm:ss").format('hh:mm a')} </Text>
                                                                                </View>
                                                                            </View>
                                                                        ))
                                                                    }
                                                                </View>
                                                                <View style={{ height: 20 }} />

                                                            </View>
                                                        </Pressable>
                                                    }
                                                    <View style={{ marginTop: 12 }}>
                                                        <Text style={{ color: themes.BlueColor1, opacity: .5, paddingTop: 10, fontSize: 15 }}>
                                                            Amenities
                                                        </Text>

                                                        <FlatList
                                                            data={customArray}
                                                            renderItem={({ item }) => (
                                                                <View style={{ width: 80 }}>
                                                                    <Image style={{ height: 35, width: 30, alignSelf: 'center' }} source={getAmenityIcon(item.name.trim())} resizeMode="contain" />
                                                                    <Text style={{ fontFamily: themes.F1_Family1, fontSize: 8, textAlign: 'center', letterSpacing: .80, }}>{item.name}  </Text>
                                                                </View>
                                                            )}
                                                            //Setting the number of column
                                                            numColumns={4}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />

                                                        <View style={{ marginTop: '6%' }} ></View>
                                                        <TouchableOpacity onPress={() => showDirections(getspecifyLocation.Location[0])}>
                                                            <View style={styles.directionsBtn}>
                                                                <Text style={styles.textStyle}>Directions</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>

                                                    <View style={{ marginTop: 6 }} >


                                                    </View>

                                                </View>
                                            </ScrollView>
                                        }
                                    </View>
                                    :
                                    <ActivityIndicator size="small" color="blue" />}
                            </RBSheet>
                        </View>



                        {/* Filter Modal */}
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                

                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                       
                                        <Text style={styles.modalText}>Filter by amenities</Text>
                                       
                                      
                                       
                                        {amenities.map((item, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <CheckBox
                                                        checkedIcon={<Image source={require('../../Images/Wcheck.png')} style={styles.checkimg} resizeMode="contain" />}
                                                        uncheckedIcon={<Image source={require('../../Images/unchecked.png')} style={styles.checkimg} resizeMode="contain" />}
                                                        checked={item?.checked}
                                                        onPress={() => checkFilterItem(index)} />
                                                    <Text style={styles.amenityText}>{item?.name}</Text>
                                                </View>
                                            )
                                        })}
                                        <TouchableOpacity
                                            disabled={!ifFilteredByAmenitiesChecked()}
                                            style={ifFilteredByAmenitiesChecked() ? [styles.filterButton, styles.buttonClose] : [styles.filterButton, styles.buttonDisabled]}
                                            onPress={() => filterLocationsByAmenities()}>
                                            <Text style={styles.textStyle}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {/* Bottom tab for navigation */}
                        <View style={{ width: '100%', position: 'absolute', bottom: -2 }}>
                            <BottomTab
                                usecolor1={themes.BlueColor1}
                                usecolor2={themes.OrangeColor2}
                                usecolor3={themes.BlueColor1}
                                usecolor4={themes.BlueColor1}
                                Img1={require("../../Images/Home.png")}
                                Img2={require("../../Images/Location1.png")}
                                Img3={require("../../Images/Promotion.png")}
                                Img4={require("../../Images/More.png")}
                                opc1={.4}
                                opc3={.4}
                                opc4={.4}
                            />
                        </View>
                    </View> : <ActivityIndicator style={{ alignSelf: 'center', marginTop: '70%' }} size="large" color={themes.OrangeColor2} />}

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    SheetContainer: {
        marginHorizontal: 23,

    },
    text1: {
        fontFamily: themes.F2_Family2,
        fontSize: 16,
        color: themes.BlueColor1,
        paddingTop: 5
    },
    businessname: {
        fontFamily: themes.F2_Family2,
        fontSize: 16,
        color: themes.BlueColor1,
        paddingTop: 15
    },
    text2: {
        fontFamily: themes.F2_Family2,
        fontSize: 16,
        color: themes.BlueColor1,
        paddingTop: 10
    },

    text2: {
        color: themes.BlueColor1,
        fontSize: 14,
        opacity: .6,
        fontFamily: themes.F2_Family1,
        paddingLeft: "3%",
    },
    text4: {
        fontFamily: themes.F2_Family2,
        fontSize: 16,
        color: themes.OrangeColor2,
        paddingTop: 5
    },
    services: {
        flexDirection: 'row',
        width: "70%",
        justifyContent: 'space-between',
        marginTop: 10
    },
    amenityText: {
        color: themes.textInputColor,
        fontFamily: themes.F1_Family1

    },
    autocompleteContainer: {
        flex: 1,
        left: 10,
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
        marginTop: Platform.OS =='android' ?  20 : 45

    },
    searchLocationInputBoxContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 40,
        borderWidth: 0,
        position: 'relative',
    },
    searchLocationInputBox: {
        borderRadius: 40,
        padding: 14,
        backgroundColor: 'white',
        borderWidth: 0.5
    },
    services2: {
        flexDirection: 'row',
        width: "65%",
        marginLeft: '3%',
        justifyContent: 'space-between',
        marginTop: 10
    },

    button: {
        backgroundColor: themes.OrangeColor2,
        height: 40,
        width: 90,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    directionsBtn: {
        backgroundColor: themes.OrangeColor1,
        height: 40,
        width: 118,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 11,
        fontFamily: themes.F2_Family1,
        letterSpacing: .9
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    filterButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#F57026",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: themes.F1_Family2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: themes.F1_Family2 
    },
    checkimg: {
        height: 25,
        width: 25,
        backgroundColor: "#29418A",

    },
    buttonDisabled: {
        backgroundColor: "#ccc",
        color: "#999"
    }
});
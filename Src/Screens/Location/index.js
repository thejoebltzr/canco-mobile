import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Pressable, Linking, FlatList, Keyboard, Modal } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Autocomplete from 'react-native-autocomplete-input';
import { themes } from '../../Constant/theme';
import BottomTab from '../../Components/BottomTab'
import { getLocation, GetSpecificLocation } from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import moment from "moment";
import { ScrollView } from 'react-native-gesture-handler';
import { getDistance } from 'geolib';
import { CheckBox } from 'react-native-elements'

 

const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
var origin = { latitude: null, longitude: null };
var destination = { latitude: null, longitude: null };
const App = () => {
    const [currentLongitude, setcurrentLongitude] = useState(null)
    const [currentLatitude, setcurrentLatitude] = useState(null)
    const [destinationLatitude, setdestinationLatitude] = useState(null)
    const [destinationLongitude, setdestinationLongitude] = useState(null)
    const [distance, setdistance] = useState("")
    const [showView, setshowView] = useState(false)
    const [distanceKm, setdistanceKm] = useState("")
    const [locations, setLocations] = useState("")
    const dispatch = useDispatch()
    const [showRoute, setshowRoute] = useState(false)
    const [fitTo, setFitTo] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [mapReady, setMapReady] = useState(false)
    const [query, setquery] = useState("")

    const [amenities, setAmenties] = useState([
        {name: "Convience Store", checked: false},
        {name: "Regular Gas", checked: false},
        {name: "Diesel", checked: false},
        {name: "Premium Gas", checked: false},
        {name: "Propane", checked: false},
        {name: "Car Wash", checked: false},
        {name: "ATM", checked: false},
        {name: "Liquor", checked: false}, 
    ])

    const { token, getLocationParams, getspecifyLocation, customArray, loading } = useSelector(({ authRed }) => authRed)

    const data = filterData(query);
    function filterData(query) {
        var data = [];
        if (getLocationParams && query.length > 0) {
            var res = getLocationParams.filter(function search(location) {
                return location.businessName.toLowerCase().includes(query.toLowerCase());
            })
            // console.log('res', res)
            res.forEach(element => {
                data.push(element.businessName + ', ' + element.address)
            });
        }
        return data;
    }

    const selectLocation = (text) => {
        Keyboard.dismiss()
        var res = getLocationParams.filter(location => (location.businessName.toLowerCase() + ', ' + location.address.toLowerCase()).includes(text.toLowerCase()))
        // console.log('res selectLocation -> ', res);
        if (res.length > 0) {
            mapRef.current.animateToRegion({
                latitude: parseFloat(res[0].latitude),
                longitude: parseFloat(res[0].longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            setquery("");
        }
    }

    useEffect(() => {
        dispatch(getLocation(token))
        setLocations(getLocationParams)
        if (getLocationParams) {
            var value = {}
            getLocationParams.forEach(element => {
                value["latitude"] = element.latitude
                value["longitude"] = element.longitude
                fitTo.push(value)
                setFitTo([...fitTo])
            });
        }
    }, [getLocationParams,getspecifyLocation])

    const Direction = () => {

        var url = `https://www.google.com/maps/dir/${currentLatitude},${currentLongitude}/${destinationLatitude},${destinationLongitude}`;
        // console.log(url)
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    Geolocation.getCurrentPosition(info => { setcurrentLatitude(info.coords.latitude), setcurrentLongitude(info.coords.longitude) },
        (error) => {
            if (error.message === "No location provider available.") {
            }
        },
    )
    function fitAllMarkers() {
        mapRef.current.fitToCoordinates(getLocationParams,
            {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
    }

    const onMapReady = () => {
        setMapReady(true)
        setLocations(getLocationParams)
        if (currentLatitude != null && currentLongitude != null) {
            mapRef.current.animateToRegion({
                latitude: currentLatitude,
                longitude: currentLongitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }

    function setDirection(lat, lng, locationId, index) {
        setdistanceKm(getDistance(
            { latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) },
            { latitude: parseFloat(lat), longitude: parseFloat(lng) }
        ))
        refRBSheet.current.open()
        setdestinationLatitude(lat);
        setdestinationLongitude(lng)
        dispatch(GetSpecificLocation(token, locationId))
    }
    
    const refRBSheet = useRef();
    const mapRef = useRef()

    function filterLocations(){
        let selectedAmenties = amenities.filter(a => a?.checked == true)
        let arr = getLocationParams.filter(l => selectedAmenties.every(a => l?.amenityIds?.split(',').includes(a?.name)))
        setLocations(arr)
        setModalVisible(!modalVisible)
    }

    function checkFilterItem(index){
        let clone = [...amenities];
        clone[index].checked = !clone[index].checked;
        setAmenties(clone)
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <MapView
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    showsBuildings={true}
                    ref={mapRef}
                    paddingAdjustmentBehavior="always"
                    mapType="terrain"
                    showsCompass={true}
                    showsUserLocation={true}
                    style={styles.mapStyle}
                    onMapReady={() => onMapReady()}
                    initialRegion={{
                        latitude: currentLatitude ? currentLatitude : 31.471641,
                        longitude: currentLongitude ? currentLongitude : 74.211139,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {mapReady && currentLatitude && currentLongitude ?
                        <MapView.Marker
                            coordinate={{
                                longitude: currentLongitude,
                                latitude: currentLatitude
                            }}>
                        </MapView.Marker>
                        : null}
                    {mapReady && locations ?
                        currentLongitude ?
                            locations.map((element, index) => {
                                return <MapView.Marker
                                    key={index}
                                    rotation={4}
                                    pinColor="red"
                                    onLayout={() => fitAllMarkers()}
                                    coordinate={{
                                        latitude: parseFloat(element.latitude),
                                        longitude: parseFloat(element.longitude)
                                    }}
                                    onPress={() => setDirection(element.latitude, element.longitude, element.locationId, index)}
                                    // onDragEnd={
                                    //     (e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                                    title={element.businessName}>
                                    <View style={{ height: 50, width: 50 }}>
                                        {element.color == false ?
                                            <Image source={require("../../../Src/Images/MapMarker2.png")} style={{ height: 50, width: 50 }} resizeMode="contain"></Image>
                                            :
                                            <Image source={require("../../../Src/Images/MapMarker1.png")} style={{ height: 50, width: 50 }} resizeMode="contain"></Image>}
                                    </View>
                                </MapView.Marker>
                            }) :
                            {/* </View> */ }
                        :
                        null}

                    {mapReady && showRoute ?
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={PLACES_API}
                            strokeColor={"#29418A"}
                            strokeWidth={6}
                            onReady={(result) => { setdistance((result.distance) / 1.609) }}
                        />
                        : null}
                </MapView>
                <View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        animationType="slide"
                        height={600}
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
                                            <Image style={{ height: 200, width: "100%", borderRadius: 25 }} source={{ uri: getspecifyLocation.Location[0].storeImage }} />
                                            <Text style={styles.businessname}>
                                                {getspecifyLocation.Location[0].businessName}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image style={{ height: 17, width: 15, opacity: .4 }} source={require("../../Images/Location.png")} resizeMode="contain" ></Image>
                                                    <Text style={styles.text2}>{((distanceKm / 1000) / 1.609).toFixed(2)} Miles {"  "}
                                                        <Text style={{}}> {Math.round((((distanceKm / 1000) * 0.01) * 60).toFixed(1))} Min Drive</Text>
                                                    </Text>
                                                </View>
                                                <ImageBackground style={{ height: 50, width: 50, opacity: .3, justifyContent: 'center', alignItems: 'center' }} source={require("../../Images/pinkRect.png")} resizeMode="contain" >
                                                    <Image style={{ height: 23, width: 15 }} source={require("../../Images/bookMark.png")} resizeMode="contain" ></Image>
                                                </ImageBackground>
                                            </View>
                                            {getspecifyLocation.Location[0].is24By7 == "1" ?
                                                <Pressable>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image style={{ height: 17, width: 15 }} source={require("../../Images/clock.png")} resizeMode="contain" ></Image>
                                                        <Text style={styles.text2}>24/7 </Text>
                                                    </View>
                                                </Pressable>
                                                : <Pressable>
                                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                        {showView == false ?
                                                            <Text style={styles.text1}>Timings</Text>
                                                            :
                                                            <Text style={styles.text4}>Timings</Text>}
                                                        {showView == true ?
                                                            <TouchableOpacity onPress={() => setshowView(false)}>
                                                                <Image resizeMode="contain" style={{ height: 12, width: 12, alignSelf: "center", marginLeft: '5%', tintColor: themes.OrangeColor2, marginTop: 8 }} source={require("../../Images/downArrow.png")} />
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity onPress={() => setshowView(true)}>
                                                                <Image resizeMode="contain" style={{ height: 13, width: 13, alignSelf: "center", marginLeft: '5%', tintColor: "#929292", marginTop: 8 }} source={require("../../Images/rightArrow.png")} />
                                                            </TouchableOpacity>}
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
                                                                <FlatList
                                                                    data={getspecifyLocation.StoreHours}
                                                                    renderItem={({ item, index }) =>
                                                                        <View style={{}}>
                                                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                                <View style={{ width: "35%" }}>
                                                                                    <Text style={styles.text2}>
                                                                                        <Text>{item.day}</Text>
                                                                                    </Text>
                                                                                </View>
                                                                                <View style={{ width: "35%", alignItems: 'center' }}>
                                                                                    <Text style={styles.text2}>{moment(item.timeFrom, "HH:mm:ss").format('hh:mm a')} </Text>
                                                                                </View>
                                                                                <View style={{ width: '20%', alignItems: "center" }}>
                                                                                    <Text style={styles.text2}>{moment(item.timeTo, "HH:mm:ss").format('hh:mm a')} </Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    }
                                                                    keyExtractor={item => item.promoId} />
                                                                <View style={{ height: 20 }} />
                                                                <TouchableOpacity onPress={() => Direction()}>
                                                                    <View style={styles.button}>
                                                                        <Text style={styles.buttonText}>directions</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </Pressable>
                                                    }
                                                </Pressable>}
                                            {showView == false ?
                                                <View style={{}}>
                                                    <Text style={[styles.text2], { color: themes.BlueColor1, opacity: .5, paddingTop: 10 }}>
                                                        Amenities
                                                    </Text>

                                                    <View style={{}}>
                                                        <FlatList
                                                            numColumns={4}
                                                            data={customArray}
                                                            renderItem={({ item, index }) =>
                                                                <View style={{ marginLeft: '2%', marginTop: "5%" }}>
                                                                    {customArray ?
                                                                        <View>
                                                                            <Image style={{ height: 35, width: 30, alignSelf: 'center' }} source={item.img} resizeMode="contain" />
                                                                            <Text style={{ fontFamily: themes.F1_Family1, fontSize: 8, textAlign: 'center', letterSpacing: .80, width: 50 }}>{item.name}</Text>
                                                                        </View>
                                                                        :
                                                                        <ActivityIndicator size="small" color={themes.BlueColor1} />
                                                                    }
                                                                </View>
                                                            }
                                                            keyExtractor={item =>
                                                                item.id}
                                                        />
                                                    </View>
                                                    <View style={{ height: 20, marginTop: '3%' }} ></View>
                                                    <TouchableOpacity onPress={() => Direction()}>
                                                        <View style={styles.button}>
                                                            <Text style={styles.buttonText}>directions</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                : null}
                                            <View style={{ height: 20, marginTop: '33%' }} ></View>

                                        </View>
                                    </ScrollView>
                                }
                            </View>
                            :
                            <ActivityIndicator size="small" color="blue" />}
                    </RBSheet>
                </View>
                <View style={styles.autocompleteContainer}>
                    <View style={styles.searchLocationInputBoxContainer}>
                        <Autocomplete
                            inputContainerStyle={styles.searchLocationInputBox}
                            data={data}
                            value={query}
                            onChangeText={(text) => setquery(text)}
                            placeholder="Search Location"
                            placeholderTextColor="gray"
                            flatListProps={{
                                keyExtractor: (_, idx) => idx,
                                renderItem: ({ item }) => {
                                    // console.log('item', item);
                                    return (
                                        <TouchableOpacity onPress={() => selectLocation(item)}>
                                            <Text style={{ padding: 10, fontFamily: themes.F2_Family1, color: themes.BlueColor1 }}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                },
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            right: 0,
                            top: 6,
                            flexDirection: 'row'}}>
                                <Text style={{ color: "#dbdbdb", fontSize: 22, marginTop: 9, marginRight: 10 }}>|</Text>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Image style={{ height: 27, width: 27, marginRight: "6%", marginTop: 14, tintColor: "#898a8d" }} source={require("../../Images/filters.png")} />
                                </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
                {/* <View style={{ flex: 1, width: "100%" }}>
                    <View style={styles.autocompleteContainer}>
                        <View style={{
                            backgroundColor: "yellow", height: 60, marginTop: 10, flexDirection: "row", width: "80%", alignSelf: "center",
                            backgroundColor: "#fff", width: "80%",
                            borderRadius: 40, elevation: 13,
                        }}>

                            <Autocomplete
                                // containerStyle={{ width: "70%", zIndex: 1, borderRadius: 40, flex: 1, borderTopLeftRadius: 40, borderBottomLeftRadius: 40, }}
                                // style={{
                                //     backgroundColor: "#fff", width: "80%",
                                //     height: 60, borderTopLeftRadius: 40, borderBottomLeftRadius: 40,
                                //     // height: 60, borderRadius: 40, alignSelf: "center", elevation: 13,

                                //     color: "#000",
                                //     paddingLeft: 30
                                // }}
                                inputContainerStyle={{ borderWidth: 0 }}
                                data={data}
                                value={query}
                                placeholder="Search Location"
                                placeholderTextColor="gray"
                                onChangeText={(text) => setquery(text)}
                                flatListProps={{
                                    keyboardShouldPersistTaps: 'always',
                                    keyExtractor: (_, idx) => idx,
                                    renderItem: ({ item }) => {
                                        console.log('item', item);
                                        return (
                                            <TouchableOpacity onPress={() => selectLocation(item)}>
                                                <Text style={{ padding: 10, fontFamily: themes.F2_Family1, color: themes.BlueColor1 }}>{item}</Text>
                                            </TouchableOpacity>
                                        );
                                    },
                                }} />
                            <Text style={{ color: "#dbdbdb", fontSize: 22, marginTop: 9, marginRight: 10 }}>|</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image style={{ height: 27, width: 27, marginRight: "6%", marginTop: 14, tintColor: "#898a8d" }} source={require("../../Images/filters.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View> */}
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
                                        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
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
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => filterLocations()}>
                                    <Text style={styles.textStyle}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
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
            </View>
        </View>
    );
};

export default App;
const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: 'red' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: 'green' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: 'blue' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];

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
    button: {
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
        fontFamily:themes.F1_Family2
    },
    checkimg: {
        height: 25,
        width: 25,
        backgroundColor: "#29418A",
        // elevation: 13
        // marginLeft: -8,
    },
});
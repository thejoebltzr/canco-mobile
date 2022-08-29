import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, PermissionsAndroid, TouchableOpacity, Pressable } from 'react-native';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import { themes } from '../../Constant/theme';
import { useState, useRef } from "react";
import Toast from 'react-native-toast-message';
import PhoneInput from "react-native-phone-number-input";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RNS3 } from 'react-native-aws3';
import { UpdateUserProfile } from '../../Redux/action';
import DisableInput from '../../Components/DisableInput';
import storage from '@react-native-firebase/storage';

import { generateUID } from '../../Utility/Utils';

import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { IS_LOADING,COUNTRY } from '../../Redux/constant';

const UpdateUser = ({ route }) => {

    var today = new Date();
    const { loading, currentUser, token, myCards } = useSelector(({ authRed }) => authRed)
    const { photo, name } = route.params
    useEffect(() => {
        dispatch({ type: IS_LOADING, isloading: false })
    }, [])

    const dispatch = useDispatch()
    const [f_Name, setf_Name] = useState(currentUser.firstname)
    const navigation = useNavigation();
    const [showPimg, setShowPimg] = useState(false);
    const [L_Name, setL_Name] = useState(currentUser.lastname)
    const [email, setemail] = useState(currentUser.email)
    const [address, setaddress] = useState(currentUser.line1)
    const [value, setValue] = useState(currentUser.cellphone);
    const [HidePicker, setHidePicker] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [imgUrl, setImgUrl] = useState(currentUser.line2);
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState(currentUser.birthdate)
    const [defaultValue, setDefaultValue] = useState("")
    const [picture, setpicture] = useState("")
    const [filePath, setFilePath] = useState({});
    const [birthYear, setBirthYear] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
      
        if (selectedDate != undefined) {
            var currentDate = selectedDate || date;
            setDateValue(moment(currentDate, 'DD-MM-YYYYY').format("DD-MM-YYYY"))
            setBirthYear(new Date(currentDate).getFullYear());
            
        }
        console.log("selected date value",dateValue,selectedDate)
        setShowDatePicker(false)
    };
    const showMode = (currentMode) => {
        console.log("current mode",currentMode)
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const UpdateUser = () => {

        const data = new FormData()
        data.append("firstName", f_Name)
        data.append("lastName", L_Name)
        data.append("dateOfBirth", dateValue)
        data.append("address", address)
        data.append("image", picture)

        if(myCards.length > 0){
            data.append("cardNumber",   myCards[0].cardnumber)
        }


        console.log(data)
       

        // //Fix for CNCO-88 
        // const currentYear = new Date().getFullYear();
        // const age = currentYear - birthYear;
        // if(age < 18){
        //     Toast.show({
        //         type: 'error',
        //         text1:'Invalid Date',
        //         text2: "Please enter your real birth date",
        //     })
        //     return
        // }
        

        if (f_Name == null) {
            Toast.show({
                type: 'error',
                text2: "Please enter your first name",
            })
            return
        }
        if (L_Name == null) {
            Toast.show({
                type: 'error',
                text2: "Please enter your last name",
            })
            return
        }
        // if (dateValue == "dd-mm-yyyy" || dateValue == null) {
        //     Toast.show({
        //         type: 'error',
        //         text2: "Please select a date of birth",
        //     })
        //     return
        // }
        if (address == null) {
            Toast.show({
                type: 'error',
                text2: "Please enter your address",
            })
            return
        }
        
        dispatch(UpdateUserProfile(
            data,
            token,
            () => {
                Toast.show({
                    type: 'success',
                    text2: "Profile updated successfully",
                })
                navigation.navigate("DashboardStorePromotion")
            }
        ))
    }

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const chooseFile = (type) => {
        // setModalVisibleImgPicker(false)
        // let options = {
        //     mediaType: type,
        //     maxWidth: 300,
        //     maxHeight: 550,
        //     quality: 1,
            
        // };

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        launchCamera(options, (response) => {
            if (response.didCancel) {
                // alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                // alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                // alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                // alert(response.errorMessage);
                return;
            }

            setFilePath(response.assets[0]);
            uploadImageToFirebase(response)
        
        })
    

        // launchImageLibrary(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         // alert('User cancelled camera picker');
        //         return;
        //     } else if (response.errorCode == 'camera_unavailable') {
        //         // alert('Camera not available on device');
        //         return;
        //     } else if (response.errorCode == 'permission') {
        //         // alert('Permission not satisfied');
        //         return;
        //     } else if (response.errorCode == 'others') {
        //         // alert(response.errorMessage);
        //         return;
        //     }

        //     setFilePath(response.assets[0]);
        //     uploadImageToFirebase(response)
        //     // uploadImageToS3(response.assets[0]);
        //     // setShowPimg(true)
        // });
    };

    const uploadImageToFirebase = (source) => {
        const file = {
            uri: source.assets[0].uri,
            name: generateUID() + '.jpg',
            type: 'image/jpeg'
        }

        let ref = storage().ref(file.name)
        let task = ref.putFile(file.uri)

        // setTransferred(0)
        task.on('state_changed', snapshot =>{
            // setTransferred(
            //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            // );
        })
        
        task.then(async response => {
            console.log('Image uploaded to bucket')
            ref.getDownloadURL().then(response => {
                setFilePath({uri: response})
                setpicture(response)
                setShowPimg(true)
            })
        }).catch((error) => {
            console.log('err',error)
        })
    }

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                // alert('Write permission err', err);
            }
            return false;
        } else return true;
    };


    function uploadImageToS3(source) {
        console.log("source 10", source.type)
        const file = {
            uri: source.uri,
            name: generateUID() + ".jpg",
            type: source.type
        }
        const options = {
            keyPrefix: "posts/",
            bucket: "memee-bucket",
            region: "eu-central-1",
            accessKey: "AKIA2YJH3TLHCODGDKFV",
            secretKey: "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",
            successActionStatus: 201
        }
        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
            setpicture(response.body.postResponse.location)
            // postUploadFN(response.body.postResponse.location);
        });
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: '-2%' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading1}>Update Profile </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ marginVertical: 10 }}>
                        <View>
                            <View style={styles.uploadView}>
                                <TouchableOpacity
                                    onPress={() => chooseFile("photo")}
                                >
                                    {showPimg == false ?
                                        <View>
                                            {currentUser.line2 == null || currentUser.line2 == "undefined"?
                                                <Image
                                                    source={require("../../Images/profile2.jpg")}
                                                    style={styles.imageUpload3}
                                                />
                                                :
                                                <Image
                                                    source={{ uri: currentUser.line2}}
                                                    style={styles.imageUpload3}
                                                />
                                            }
                                        </View>
                                        :
                                        <Image
                                            source={{ uri: filePath.uri }}
                                            // source={{ uri: filePath.uri }}

                                            style={styles.imageUpload3}
                                        />
                                    }
                                    {/* :<Image
                                   source={require("../../Images/profile2.jpg")}
                                     // source={{ uri: filePath.uri }}
                                     style={styles.imageUpload3}
                                 />} */}


                                </TouchableOpacity>
                            </View>

                            <View style={styles.imageUpload2}>
                                <TouchableOpacity onPress={() => chooseFile("photo")}>
                                    <Image resizeMode="contain" style={{ height: 15, width: 15, tintColor: 'white' }} source={require("../../Images/uploadLogo.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <InputField  onChangeText={text => setf_Name(text)} value={f_Name} title="First Name" placeholder="First Name" />
                        <InputField onChangeText={text => setL_Name(text)} value={L_Name} title="Last Name" placeholder="Last Name" />
                        <DisableInput  editable={false} onChangeText={text => setemail(text)} value={email} title="Email" placeholder="Email" />
                        <DisableInput editable={false} value={value} title="Phone Number" placeholder="" />
                        <InputField onChangeText={text => setaddress(text)} value={address} title="Address" placeholder="" />
                        <DisableInput  editable={false}  value={dateValue} title="Date of Birth" placeholder="Date of Birth" />
                    </View>
                    <BlueButton loader={loading} onPress={() => UpdateUser()} title="Update" />

                </ScrollView>


            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
    heading: {
        color: themes.BlueColor1,
        fontSize: 22,
        fontFamily: themes.F2_Family1,
        fontWeight: '700'
    },
    phoneinput: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        paddingHorizontal: 30
    },
    codestyle: {
        alignSelf: 'center',
        backgroundColor: '#f3f3f3',
        textAlign: 'center',
        marginLeft: -30,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontSize: 16
    },
    flagstyle: {
        marginLeft: "-15%"
    },
    inputnumber: {
        backgroundColor: themes.TextInputBGC,
        height: 60,
        width: "100%",
        color: '#000',
        fontFamily: themes.F2_Family1,
        fontSize: 16,
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    heading1: {
        fontSize: 22,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
        paddingLeft: '3%'
    },
    uploadView: {
        backgroundColor: themes.TextInputBGC,
        height: 160,
        borderRadius: 80,
        justifyContent: 'center',
        marginTop: 10,
        width: 160,
        alignSelf: 'center'
    },
    imageUpload: {
        alignSelf: 'center',
    },
    imageUpload2: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        borderWidth: 1.2,
        borderColor: 'gray',
        borderRadius: 20,
        position: "absolute",
        top: 130,
        left: 195,
        backgroundColor: "#29418A",
        justifyContent: "center",
        alignItems: "center"
    },
    imageUpload3: {
        height: 160,
        width: 160,
        alignSelf: 'center',
        borderWidth: 1.2,
        borderRadius: 230,
        justifyContent: "center",
        alignItems: "center"
    },
    uploadText: {
        textAlign: 'center',
        paddingTop: '10%',
        fontSize: 10,
        fontFamily: themes.F2_Family1
    }

});
export default UpdateUser;

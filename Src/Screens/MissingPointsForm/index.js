import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { themes } from '../../Constant/theme';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import {generateUID} from '../../Utility/Utils';
import { RNS3 } from 'react-native-aws3';
import Toast from 'react-native-toast-message';
import  {MISSINGPOINTSFORM,IS_LOADING}  from '../../Redux/constant';
import { MissingContactForm } from '../../Redux/action';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
// import auth, { firebase } from '@react-native-firebase/auth';

import firebase from '@react-native-firebase/app';
import { Dimensions } from 'react-native';

export default function MissingPoints({ navigation }) {
    const {token, currentUser, myCards } = useSelector(({ authRed }) => authRed)

    const dispatch = useDispatch()
    const { loading } = useSelector(({ authRed }) => authRed)
    const [cards, setCards] = useState([])
    const [transferred, setTransferred] = useState(0)
    
    useEffect(() => {
        let cardsTmp = []
        dispatch({type:IS_LOADING, isloading:false})

        myCards.forEach(item => {
            cardsTmp.push({label:item.cardnumber, value: item.cardnumber, icon: () =>  <Image style={{ height: 24, width: 29, marginLeft: '5%' }} source={require("../../Images/cancoIcon1.png")} /> })
        });

        setCards(cardsTmp)


      
    }, [myCards])

    const[F_name, setF_Name]= useState("")
    const[L_name, setL_Name]= useState("")
    const[email, setemail]= useState("")
    const[cardNum, setcardNum]= useState("")
    const[transaction, settransaction]= useState("")
    const [picture, setpicture]= useState("")
    const [pictureName, setpictureName]= useState("")

    const [singleFile, setSingleFile] = useState('');
    const [ShowName, setShowName] = useState(false)
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple', icon: () =>  <Image style={{ height: 24, width: 29, marginLeft: '5%' }} source={require("../../Images/cancoIcon1.png")} />},
        {label: 'Banana', value: 'banana', icon:() =>  <Image style={{ height: 24, width: 29, marginLeft: '5%' }} source={require("../../Images/cancoIcon1.png")} />}
    ]);
    const [open, setOpen] = useState(false);

    const selectOneFile = async () => {

        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options,(response) => {
            if(!response.didCancel){
                // console.log(response.assets)
                uploadImageToFirebase(response)
            }
           
        })
        
        // try {
        //     const res = await DocumentPicker.pick({
        //         type: [DocumentPicker.types.allFiles],
        //     });
        //     uploadImageToS3(res)
        //     setSingleFile(res);
        //     setpictureName(res.name)
        //     setpicture(res.uri)
        // } catch (err) {
        //     if (DocumentPicker.isCancel(err)) {
        //     } else {
        //         alert('Unknown Error: ' + JSON.stringify(err));
        //         throw err;
        //     }
        // }
    };
    
    const uploadImageToFirebase = (source) => {

        const file = {
            uri: source.assets[0].uri,
            name: generateUID() + '.jpg',
            type: 'image/jpeg'
        }

      
        setSingleFile(source)

        let ref = storage().ref(file.name)
        let task = ref.putFile(file.uri)

        setTransferred(0)
        task.on('state_changed', snapshot =>{
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
           
        })
        
        task.then(async response => {
            console.log('Image uploaded to bucket')
            
            ref.getDownloadURL().then(response => {
                setpicture(response)
            })
        }).catch((error) => {
            console.log('err',error)
        })
    }

    function uploadImageToS3(source) {
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
        });
    }
    
    const missingContactForm = () => {
        const missingContact = new FormData()
        missingContact.append("firstName", F_name)
        missingContact.append("lastName", L_name)
        missingContact.append("email", email)
        missingContact.append("cardNumber", cardNum)
        missingContact.append("transactionNumber", transaction)
        missingContact.append("uploadReceipt", picture)
        missingContact.append("senderEmail", currentUser.email)

        if (transaction == "") {
            Toast.show({
            type: 'info',
            text1: 'Alert!',
            text2: "Please enter your transaction number",
            })
            return
        }
        if (cardNum == "") {
            Toast.show({
            type: 'info',
            text1: 'Alert!',
            text2: "Please enter your card number",
            })
            return
        }
        if (singleFile == "") {
            Toast.show({
            type: 'info',
            text1: 'Alert!',
            text2: "Please upload receipt",
            })
            return
        }

        dispatch(MissingContactForm(
            missingContact,
            token,
            () => {
                setF_Name("")
                setL_Name("")
                setcardNum("")
                setemail("")
                settransaction("")
                setSingleFile("")
            },
            () => {navigation.navigate("MissingPointsSend")}
        ))
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable onPress={() => navigation.goBack()} >
                            <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: '-5%' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                        </Pressable>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading1}>Contact Form</Text>
                            <Pressable>
                                <Text style={styles.missingPoint}>Missing points </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View>
                        <InputField onChangeText={text => setF_Name(text)} value={F_name} title="First Name" placeholder="First Name" />
                        <InputField onChangeText={text => setL_Name(text)} value={L_name}   title="Last Name" placeholder="Last Name" />
                        <InputField onChangeText={text => setemail(text)} value={email} title="Email" placeholder="Email" keyboardType="email-address" />
                        <Text style={styles.text3}>Your Card Number</Text>
                        {/* <View style={styles.flagView}> */}
                            {/* <Image style={{ height: 24, width: 29, marginLeft: '5%' }} source={require("../../Images/cancoIcon1.png")} /> */}
                                <DropDownPicker
                                    open={open}
                                    value={cardNum}
                                    items={cards}
                                    setOpen={setOpen}
                                    setValue={setcardNum}
                                    setItems={setItems}
                                    placeholder='Select card number'
                                    style={{borderColor:'#CDCDCD', marginTop:8}}
                                />
                            {/* <TextInput onChangeText={text => setcardNum(text)} value={cardNum} placeholder="xxxxxx xxxx xxxx 7571" placeholderTextColor="#929292" keyboardType="decimal-pad"  style={styles.input} /> */}
                        {/* </View> */}
                        <InputField onChangeText={text => settransaction(text)} value={transaction} title="Transaction Number" placeholder="5168 8950 1222 2121" keyboardType="decimal-pad" />
                        <Text style={styles.text3}>Upload Receipt</Text>
                        <View style={styles.uploadView}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.buttonStyle}
                                onPress={selectOneFile}>
                                    
                                <Image
                                    // source={ picture ? {uri: "https://firebasestorage.googleapis.com/v0/b/canco-convrtx.appspot.com/o/b86d114d-c8f9-4503-a4fe-1bac0c2fb213.jpg?alt=media&token=2e46b65f-f29d-4167-9559-b308f5d8040e"}  : require("../../Images/uploadLogo.png")}
                                    source={ picture ?  {uri : picture} : require("../../Images/uploadLogo.png")}
                                    // style={styles.imageUpload}
                                    style={picture ?  {width:'100%', height:'100%'}: styles.imageUpload}
                                />
                            </TouchableOpacity>
                            {ShowName != singleFile ?
                                <Text style={styles.uploadText}>
                                    {singleFile.name ? singleFile.name : ''}
                                    {'\n'}
                                </Text>
                                : null}
                        </View>
                        
                    
                        {singleFile ? <Progress.Bar progress={transferred} width={Dimensions.get('screen').width-60} style={styles.progress}  />: null}
                        
                        <View style={{ marginTop: '12%' }}>
                            <BlueButton onPress={()=> missingContactForm()} loader={loading} title="Submit" />
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
    heading1: {
        fontSize: 22,
        color: themes.BlueColor1,
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
    },
    headingContainer: {
        marginLeft: '7%'
    },
    progress:{
        marginTop:8
    },
    missingPoint: {
        fontSize: 12,
        color: "#000",
        fontFamily: themes.F2_Family1,
        paddingTop: '1%'
    },
    flagView: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: themes.textInputColor,
        height: 60,
        width: '85%',
        borderRadius: 30,
        paddingHorizontal: 10,
        // opacity:.6
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    uploadView: {
        backgroundColor: themes.TextInputBGC,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 10
    },
    imageUpload: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        tintColor: '#000',
        opacity:.6
    },
    uploadText: {
        textAlign: 'center',
        paddingTop: '10%',
        fontSize: 10,
        fontFamily: themes.F2_Family1
    }

})
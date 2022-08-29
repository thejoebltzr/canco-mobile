import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import BlueButton from '../../Components/BlueButton';
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { LoginAction } from '../../Redux/action';
import { LoginManager, AccessToken, Profile, Settings } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native';
Settings.initializeSDK();

export default function LoginScreen({ route }) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { loading } = useSelector(({ authRed }) => authRed)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [information, setinformation] = useState('');

    const loginFunction = () => {
        if (email == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your email",
            })
            return
        }
        if (password == "") {
            Toast.show({
                type: 'error',
                text2: "Please enter your password",
            })
            return
        }

        const form_data = new FormData()
        form_data.append("email", email)
        form_data.append('password', password)
        
        dispatch(LoginAction(
            form_data,
            () => {
                setEmail("")
                setPassword("")
            },
            () => {
                navigation.navigate('DashboardStorePromotion')
            },
            () => {
                Toast.show({
                    type: 'error',
                    text2: "Invalid Credentials",
                })
            }
        ))
    }

    GoogleSignin.configure({
        // webClientId: '664328630456-u57t2fui3k3en8bnbbkrdvbism1epfll.apps.googleusercontent.com', 
        androidClientId: '1097750300080-9u6op7svlicbal3j6fohsoup871rer5n.apps.googleusercontent.com',
        offlineAccess: false
    });

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
         
            // console.log(userInfo,'USER')
            // console.log(userInfo.user.familyName,"|| Give name\n\n")
            navigation.navigate("RegisterScreen",{fname:userInfo.user.givenName, lname:userInfo.user.familyName,Emaill:userInfo.user.email,picture:userInfo.user.photo})
            // setinformation(userInfo)

            // this.setState({ userInfo });
        } catch (error) {
            console.log(error,'ERROR')
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    // Fb Login
    async function onFacebookButtonPress() {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                console.log("result",result)
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString(),
                        // alert(result.grantedPermissions) 
                    );
                    const currentProfile = Profile.getCurrentProfile().then(
                        function (currentProfile) {
                            if (currentProfile) {
                                console.log("The current logged user is: " +
                                    currentProfile,
                                );


                             
                            }
                        },
                        AccessToken.getCurrentAccessToken().then((data) => {
                            const { accessToken } = data
                            initUser(accessToken)
                        })
                    );
                    console.log("con", currentProfile)
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const initUser = (token) => {
        fetch('https://graph.facebook.com/v13.0/me?fields=email,name,location,first_name,last_name,picture,friends&access_token=' + token).then((response) => response.json())
            .then((json) => {
                let lastname = json.name.split(' ').length > 1 ?  json.name.split(' ')[1] : json.name
                navigation.navigate("RegisterScreen",{fname:json.first_name, lname:json.last_name,Emaill:json.email,picture:json.picture.data.url})

            })
            .catch((err) => {
                console.log('ERROR GETTING DATA FROM FACEBOOK', err)
            })
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.imageLogo} source={require("../../Images/cancoIcon1.png")} />
                    <Text style={styles.text1}>Savings begin here</Text>
                    <Animatable.Text animation="fadeInUp" style={styles.text2} >Login</Animatable.Text>
                    <View>
                        <Text style={styles.text3}>User Name</Text>
                        <TextInput  autoCapitalize='none' onChangeText={text => setEmail(text)} keyboardType="email-address" value={email} style={styles.textinput1} placeholder="example@email.com" placeholderTextColor="#929292" />
                    </View>
                    <View>
                        <Text style={styles.text3}>Password</Text>
                        <TextInput onChangeText={text => setPassword(text)} value={password} style={styles.textinput1} placeholder="********" placeholderTextColor="#929292" secureTextEntry={true} />
                    </View>
                    <Pressable onPress={() => navigation.navigate("ResetPassword")}>
                        <Text style={styles.forget}>Forget password?</Text>
                    </Pressable>
                    {/* <Pressable  > */}
                    <BlueButton onPress={() => loginFunction()} title="Login"
                        loader={loading}
                    />
                    {/* </Pressable> */}
                    <View style={{ flexDirection: 'row', width: '66%', alignSelf: 'center', marginTop: 20 }}>
                            <Text style={styles.text4}>Don't have an account?</Text>
                            <Pressable onPress={() => navigation.navigate("RegisterScreen",{fname:"",lname:"",Emaill:""})} >
                                <Text style={styles.text5}>  Sign up</Text>
                            </Pressable>
                    </View>
                    <Text style={[styles.text4, {marginTop: 20, marginBottom: 20, fontSize: 20}]}>OR</Text>
                    <View>
                        <TouchableOpacity onPress={()=> onFacebookButtonPress()}>
                        <View style={styles.socialButton}>
                            <View style={styles.socialButton1}>
                                <Image style={{ height: 27, width: 27 }} source={require("../../Images/facebook.png")} />
                                <Text style={{ fontFamily: 'MyriadPro', fontSize: 16, color: themes.BlueColor1, fontWeight: '700' }}> Sign up with Facebook</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={{ marginVertical: '3%' }}>
                            <TouchableOpacity onPress={()=> signIn()}>
                            <View style={styles.socialButton}>
                                <View style={styles.socialButton1}>
                                    <Image style={{ height: 27, width: 27 }} source={require("../../Images/gmail.png")} />
                                    <Text style={{ fontFamily: 'Myriad Pro Bold', fontSize: 16, color: themes.BlueColor1, fontWeight: '700', paddingRight: 14 }}> Sign up with Google</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
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
    imageLogo: {
        height: 73,
        width: 88,
    },
    text1: {
        color: themes.BlueColor1,
        fontSize: 18,
        paddingTop: '4%',
        fontFamily: themes.F1_Family2
    },
    text2: {
        color: themes.BlueColor1,
        fontSize: 30,
        paddingTop: '6%',
        fontFamily: themes.F2_Family1,
        fontWeight: '700',
    },
    text3: {
        color: themes.BlueColor1,
        fontSize: 12,
        paddingTop: '4%',
        fontFamily: themes.F2_Family1,
    },
    textinput1: {
        marginVertical: 8,
        backgroundColor: themes.TextInputBGC,
        color: "#000",
        height: 60,
        width: '100%',
        borderRadius: 30,
        paddingHorizontal: 30
    },
    forget: {
        alignSelf: 'flex-end',
        fontSize: 14,
        color: themes.BlueColor1,
        fontFamily: themes.F1_Family1,
        fontWeight: '700',
        paddingTop: 3
    },
    button1: {
        backgroundColor: themes.Button,
        color: themes.textInputColor,
        height: 60,
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        marginVertical: 8
    },
    button1text: {
        color: "#fff",
        fontFamily: themes.F2_Family1,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 2
    },
    socialButton: {
        backgroundColor: '#ffff',
        flexDirection: 'row',
        color: themes.BlueColor1,
        height: 60,
        width: '100%',
        borderRadius: 30,
        borderColor: '#DEDEDE',
        borderWidth: .6
    },
    social_button: {
        marginVertical: 20
    },
    socialButton2: {
        backgroundColor: '#ffff',
        flexDirection: 'row',
        color: themes.BlueColor1,
        height: 60,
        width: '100%',
        borderRadius: 30,
        marginVertical: 20,
        borderColor: '#DEDEDE',
        borderWidth: .6
    },
    socialButton1: {
        justifyContent: 'space-between',
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 30
    },
    text4: {
        textAlign: 'center',
        color: themes.BlueColor1,
        fontFamily: themes.F1_Family1,
    },
    text5: {
        color: themes.OrangeColor2,
        fontFamily: themes.F1_Family2,
    }
})
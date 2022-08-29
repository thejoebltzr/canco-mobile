import React, { useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity, Linking, Modal } from 'react-native';
import InputField from '../../Components/InputField';
import BlueButton from '../../Components/BlueButton';
import PasswordInputField from '../../Components/PaswordInputField';
import { themes } from '../../Constant/theme';
import { useState, useRef } from "react";
import Toast from 'react-native-toast-message';
import PhoneInput from "react-native-phone-number-input";
import { CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { RegisterFormDataConst, IS_LOADING, COUNTRY } from '../../Redux/constant';
import { RegisterUserFn, ValidateEmail } from '../../Redux/action';

const RegisterScreen = ({ route }) => {
  var today = new Date();
  const { loading } = useSelector(({ authRed }) => authRed)
  const { fname, lname, Emaill, picture } = route.params



  useEffect(() => {

    dispatch({ type: IS_LOADING, isloading: false })

  }, [])

  const dispatch = useDispatch()
  const [f_Name, setf_Name] = useState(fname)
  const navigation = useNavigation();

  const [L_Name, setL_Name] = useState(lname)
  const [email, setemail] = useState(Emaill)
  const [address, setaddress] = useState("")
  const [password, setpassword] = useState("")
  const [C_password, setC_password] = useState("")
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef()
  const [checked, setchecked] = useState(false);
  const [HidePicker, setHidePicker] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState("dd-mm-yyyy")
  const [defaultValue, setDefaultValue] = useState("CA")
  const [errorMsg, setErrorMsg] = useState('')
  const [ccode, setccode] = useState("CA");
  const [birthYear, setBirthYear] = useState();
  const [showRegistrationErrorModal, setShowRegistrationErrorModal] = useState(false);

  const onChange = (event) => {
    if (event != undefined) {
      var currentDate = event || date;
      setDateValue(moment(currentDate, 'DD-MM-YYYYY').format("DD-MM-YYYY"))
      setBirthYear(new Date(currentDate).getFullYear());
      // setHidePicker(false)
    }
    else {
      // setHidePicker(false)
    }
    setHidePicker(false)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const PassWord = password;
  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  const passResult = strongRegex.test(PassWord)

  const Email = email;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const EmailResult = mailformat.test(Email)
  console.log("Email format", EmailResult)
  const RegisterUser = () => {

    const RegisterFormData = new FormData()
    RegisterFormData.append("firstName", f_Name)
    RegisterFormData.append("lastName", L_Name)
    RegisterFormData.append("email", email)
    RegisterFormData.append("phoneNumber", formattedValue)
    RegisterFormData.append("dateOfBirth", dateValue)
    RegisterFormData.append("address", address)
    RegisterFormData.append("password", password)
    RegisterFormData.append("image", picture)


    if (f_Name == "") {
      Toast.show({
        type: 'info',
        text2: "Please enter your First Name",
      })
      return
    }
    if (L_Name == "") {
      Toast.show({
        type: 'info',
        text2: "Please enter your Last Name",
      })
      return
    }
    if (email == "") {
      Toast.show({
        type: 'info',
        text2: "Please enter your email",
      })
      return
    }
    if (value == "") {
      Toast.show({
        type: 'info',
        text2: "Please enter your phone number",
      })
      return
    }
    if (dateValue == "dd-mm-yyyy" || dateValue == "") {
      Toast.show({
        type: 'info',
        text2: "Please select a date of birth",
      })
      return
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age < 18) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date',
        text2: "Please enter your real birth date",
      })
      return
    }

    if (address == "") {
      Toast.show({
        type: 'info',
        text2: "Please enter your address",
      })
      return
    }
    if (password == "" || password.length <= 7) {
      Toast.show({
        type: 'info',
        text2: "Password must be 8 character long and unique",
      })
      return
    }
    if (!passResult) {
      console.log("fail", passResult)
      Toast.show({
        type: 'error',
        text2: "Password must have at least one uppercase letter, one lowercase letter and one number ",
      })
      return
    }
    if (!EmailResult) {
      console.log("fail", EmailResult)
      Toast.show({
        type: 'error',
        text2: "Email is invalid",
      })
      return
    }
    var result = password.localeCompare(C_password)
    console.log("this is compare result", result)
    if (result == 1 || result == -1) {
      Toast.show({
        type: 'error',
        text2: "Passwords must be same",
      })
      return
    }
    if (checked == "") {
      Toast.show({
        type: 'info',
        text2: "Please agree to our Terms & Conditions",
      })
      return
    }

    if (!phoneInput.current?.isValidNumber(formattedValue)) {
      Toast.show({
        type: 'info',
        text2: "Invalid phone number",
      })
      return
    }

       
    
    dispatch(ValidateEmail(RegisterFormData,(response) => {

      if(response.Status == 400){
        setShowRegistrationErrorModal(true)
        setErrorMsg(response.Message)
      }else{
        dispatch({ type: RegisterFormDataConst, data: RegisterFormData },
          navigation.navigate("ContinueWithPhone", { cellNoParam: value, code: defaultValue, C_number: formattedValue }),
          dispatch({ type: COUNTRY, data: defaultValue })
        )
      }

    }))

  }

  function openTerms() {
    try {
      Linking.openURL('https://www.cancopetroleum.ca/TermsAndPrivacy')
    } catch (e) { }
  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading} >Register</Text>
          <View style={{ marginVertical: 10 }}>
            <InputField onChangeText={text => setf_Name(text)} value={f_Name} title="First Name" placeholder="First Name" />
            <InputField onChangeText={text => setL_Name(text)} value={L_Name} title="Last Name" placeholder="Last Name" />
            <InputField onChangeText={text => setemail(text)} value={email} title="Email" placeholder="Email" />
            <View >
              <Text style={styles.text3}>Phone Number</Text>
              <View style={{}}>
                <PhoneInput
                  textInputStyle={styles.inputnumber}
                  containerStyle={styles.phoneinput}
                  disableArrowIcon="true"
                  flagButtonStyle={styles.flagstyle}
                  textContainerStyle={{ backgroundColor: "#f3f3f3" }}
                  codeTextStyle={styles.codestyle}
                  ref={phoneInput}
                  defaultCode={ccode}
                  onChangeCountry={(ccode) => console.log("COUNTRY", setDefaultValue(ccode.cca2))}
                  defaultValue={value}
                  placeholder="123-555-2514"
                  textInputProps={{
                    placeholderTextColor: "#929292"
                  }}
                  onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                />
              </View>
            </View>
            <Text style={styles.text3}>Date Of Birth</Text>
            <View style={[styles.phoneinput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <TouchableOpacity onPress={() => setHidePicker(true)} style={{ justifyContent: 'center', height: 60, width: "100%" }} title="Show date picker!">
                <Text style={{ fontFamily: themes.F2_Family1, fontSize: 16, color: '#929292' }} >
                  {dateValue}
                </Text>
              </TouchableOpacity>
              {/* {HidePicker ?
                <DateTimePicker
                  mode={mode}
                  is24Hour={true}
                  value={new Date()}
                  display="spinner"
                  onChange={onChange}
                  maximumDate={today}
               
                />
                : null} */}

              <DateTimePickerModal
                is24Hour={true}
                isVisible={HidePicker}
                mode={mode}
                display='spinner'
                onConfirm={onChange}
                maximumDate={today}
                onCancel={() => {
                  setHidePicker(false)
                }}
              />
              <Image resizeMode="contain" source={require("../../Images/Vector.png")} style={{ height: 23, width: 23, marginLeft: -10 }} />
            </View>
            <InputField onChangeText={(text) => {
              const val = text.replace(/[`~!@$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
              setaddress(val)
            }
            } title="Address" placeholder="xyz" value={address} />
            <PasswordInputField Icon={require("../../Images/infoIcon.png")} value={password} onChangeText={(text) => setpassword(text)}
              title="Password" placeholder="*********" title2="Password must contain atleast one upperCase, One Lower case, One digit." />
            <PasswordInputField value={C_password} onChangeText={(text) => setC_password(text)} title="Confirm Password" placeholder="*********" />
            <View style={styles.cheboxContainer}>
              <View style={styles.checkbox}>
                <CheckBox
                  checkedIcon={<Image source={require('../../Images/checked.png')} style={styles.checkimg} resizeMode="contain" />}
                  uncheckedIcon={<Image source={require('../../Images/unchecked.png')} style={styles.checkimg} />}
                  checked={checked}
                  onPress={() => setchecked(!checked)} />
              </View>
              <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '700', color: themes.BlueColor1, fontFamily: themes.F2_Family1 }} >I agree with </Text>
              <TouchableOpacity onPress={openTerms}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: themes.OrangeColor2, fontFamily: themes.F2_Family1 }}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.advertisement}>Send me for marketing and advertisement by email</Text>
          </View>
          <BlueButton loader={loading} title="Signup" onPress={() => RegisterUser()} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }} >
            <Text style={styles.lastText1} >Already have an account? </Text>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate("Login")} >
              <Text style={styles.lastText2}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showRegistrationErrorModal}
                    onRequestClose={() => {
                      setShowRegistrationErrorModal(!showRegistrationErrorModal);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Registration Failed</Text>
                            <Text style={styles.modalContent}>{errorMsg}</Text>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    // setShowRegistrationErrorModal(!showRegistrationErrorModal)
                                    // navigation.reset({
                                    //     index: 0,
                                    //     routes: [{ name: 'RegisterScreen', params: { fname: '', lname: '', Email: '', picture: '' } }],
                                    // });
                                    setShowRegistrationErrorModal(!showRegistrationErrorModal)
                                }} style={styles.modalBtn}>
                                    <Text style={styles.modalBtnText}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
  
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
    fontSize: 30,
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
    color: '#929292',
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
  checkbox: {
    height: 30,
    width: 30,
    backgroundColor: '#f3f3f3',
    borderRadius: 10
  },
  checkimg: {
    height: 20,
    width: 20,
    marginLeft: -15,

  },
  cheboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 15
  },
  advertisement: {
    marginHorizontal: 30,
    color: themes.BlueColor1,
    fontFamily: themes.F1_Family1,
    textAlign: 'center',
    paddingVertical: 1
  },
  lastText1: {
    color: themes.BlueColor1,
    fontFamily: themes.F1_Family1,
    textAlign: 'center'
  },
  lastText2: {
    color: themes.OrangeColor2,
    fontFamily: themes.F1_Family2,
    paddingLeft: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "75%",
        padding: 25,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 13
    },
        modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12
    },
    modalContent: {

        marginBottom: 16,
        fontSize: 16,

    },
    modalBtn: {
        // alignItems: 'center',
        backgroundColor: 'red',
        width: '60%',
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 14,


    },
    modalBtnText: {
        color: '#ffffff'
    }
});
export default RegisterScreen;

// Example of File Picker in React Native
// https://aboutreact.com/file-picker-in-react-native/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [singleFile, setSingleFile] = useState('');
  const [multipleFile, setMultipleFile] = useState([]);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of File Picker in React Native
      </Text>
      <View style={styles.container}>
        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </Text>
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            margin: 10
          }} />
        {/*To multiple single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectMultipleFile}>
          {/*Multiple files selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick multiple files
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        <ScrollView>
          {/*Showing the data of selected Multiple files*/}
          {multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

// import React from 'react';
// import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
// import { themes } from '../../Constant/theme';

// export default function OrangeHeader() {

//     return (
//         <View style={{ backgroundColor: '#FE9166', flex: 1 }}>
//             <View >
//                 <View style={{ flexDirection: 'row', marginTop: '15%' }}>
//                     <Image style={{ height: 15, width: 20, marginLeft: '3%', tintColor: '#fff' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
//                     {/* <Text>kdncndkckdc dkc </Text> */}
//                 </View>

//                 <View style={styles.whiteSheet}>
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                         <Image style={{ height: 41, width: 50, marginTop: 25 }} resizeMode="contain" source={require("../../Images/cancoIcon1.png")} />
//                         <Text style={styles.subHeading}>Tommorow get
//                             <Text style={[styles.subHeading], { fontWeight: '700' }}>
//                                 {" "}Coca Cola 2L Regular</Text>
//                             <Text style={styles.subHeading}>{"\n"}for<Text style={[styles.subHeading], { fontWeight: '700' }}>
//                                 {" "}$1.99</Text></Text></Text>
//                         <ScrollView >
//                             <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight:'50%' }}>
//                                 {/* <Vi/>ew style={{}}> */}
//                                 <Image resizeMode="contain" style={{ height: 582, height: 375, marginTop: 20 }} source={require("../../Images/cocacola.png")} />
//                             </View>

//                             {/* </View> */}
//                             <View style={{width:"45%", paddingLeft:'2%'} }>

//                                 <Text style={styles.description}>
//                                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                                     It has survivedmore recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//                                 </Text>
//                                 {/* </View> */}
//                             </View>
//                         </ScrollView>





//                     </View>
//                     <Text>sncsknskn</Text>


//                 </View>

//             </View>
//             {/* <View style={styles.whiteSheet}>
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <Image style={{ height: 41, width: 50, marginTop: 25 }} resizeMode="contain" source={require("../../Images/cancoIcon1.png")} />
//                     <Text style={styles.subHeading}>Tommorow get
//                         <Text style={[styles.subHeading], { fontWeight: '700' }}>
//                             {" "}Coca Cola 2L Regular</Text>
//                         <Text style={styles.subHeading}>{"\n"}for <Text style={[styles.subHeading], { fontWeight: '700' }}>
//                             {" "}$1.99</Text></Text></Text>
//                             <ScrollView style={{backgroundColor:'red'}}>
//                                 <View>
//                                 <Image resizeMode="contain" style={{ height: 582, height: 375, marginTop: 20 }} source={require("../../Images/cocacola.png")} />
//                         <View style={{}}>
//                     <Text style={styles.description}>
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                         It was popularised Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                         It was popularise in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//                     </Text>
//                                 </View>

                   
//                     </View>

//                     </ScrollView>
//                     <Text>sncsknskn</Text>
//                 </View>

//             </View> */}

//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         // marginVertical: 90,
//         // marginTop:80,
//         // height:80,
//         // marginHorizontal: 15,
//         // backgroundColor: 'pink',
//         // flex: 2,

//     },
//     heading1: {
//         fontSize: 22,
//         color: themes.BlueColor1,
//         fontFamily: themes.F2_Family1,
//         fontWeight: '700',
//     },
//     whiteSheet: {
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 25,
//         borderTopRightRadius: 25,
//         marginTop: 20,
//         // width:'80%',
//         alignItems:'center'
//         // flex:1
//     },
//     subHeading: {
//         textAlign: 'center',
//         fontFamily: "#171717",
//         fontSize: 18,
//         lineHeight: 22
//     },
//     description: {
//         color: "#000",
//         fontFamily: themes.F2_Family1,
//         fontSize: 16,
//         lineHeight: 30,
//         // width:"98%",
//         // paddingLeft:20,

//         // backgroundColor:'green'
//         // textAlign:'right'

//         // width:375
//         // paddingLeft:-30
//     }



// })
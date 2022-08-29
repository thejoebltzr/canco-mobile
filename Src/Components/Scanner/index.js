import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { themes } from '../../Constant/theme';
import { RNCamera, } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default function BarcodeScanner({ onBarCodeRead, closeModal, isVisible }) {
    const [camera, setCamera] = useState(null);
    const [isBarcodeDetected, setIsBarcodeDetected] = useState(false);
    return (
        <Modal visible={isVisible} style={{ backgroundColor: 'black' }}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
               
                <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => closeModal()}  style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                        <Image style={{ height: 15, width: 20, marginLeft: '3%', marginTop: 2 }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Scan Code</Text>
                </View>

                <ScrollView>
                    <View style={styles.container}>

                        <View style={{ alignItems: 'center' }}>
                            <Image resizeMode="contain" style={{ height: 250, width: 350, marginTop: 5, borderRadius: 50 }} source={require("../../Images/canco_card.png")} />
                        </View>
                        <RNCamera
                            ref={(ref) => {
                                setCamera(ref)
                            }}
                            style={styles.preview}
                            type={
                                RNCamera.Constants.Type.back
                            }
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}

                            captureAudio={false}

                            onBarCodeRead={
                                (e) => {

                                    if (e.data != null) {
                                        setIsBarcodeDetected(true);
                                        onBarCodeRead(e.data);
                                        closeModal()
                                    }

                                }
                            }
                        >
                           
                            <BarcodeMask outerMaskOpacity={0.5}  />

                        </RNCamera>
                        <View style={{ alignItems: 'center' }}>
                            <Image resizeMode="contain" style={{ height: 250, width: 350, top: 30 }} source={require("../../Images/UseCard.png")} />
                        </View>
                    </View>

                </ScrollView>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 45
    },
    preview: {
        height: 250,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 15
    },
    heading: {
        fontFamily: themes.F2_Family1,
        color: themes.BlueColor1,
        fontSize: 22,
        left: 8,
        paddingTop: "1.5%"
    },
})
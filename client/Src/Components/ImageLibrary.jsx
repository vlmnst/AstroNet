import React, { useState, } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageLibrary = () => {

    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [image, setImage] = useState({
        one: null,
        two: null,
        three: null,
    });

    // permisos
    const permisionFunction = async(from, number) => {

        //  ------ CAMERA PERMISSION ------      
        if (from === 'camera') {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            // console.log(cameraPermission);

            setCameraPermission(cameraPermission.status === 'granted');

            if (cameraPermission.status !== 'granted') {
                alert('Permission for media access needed.');
            } else {
                openCamera(number);
            };

        //  ------ GALLERY PERMISSION ------  
        } else if (from === 'gallery') {
            const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync(); //requestMediaLibraryPermissionsAsync(writeOnly)
            console.log(imagePermission);
            // console.log(imagePermission.status);

            setGalleryPermission(imagePermission.status === 'granted');

            if (imagePermission.status !== 'granted') {
                alert('Permission for media access needed');
            } else {
                selectImage(number);
            };
        };
    };

    // abrir galeria
    const selectImage = async(number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
            // returns ---> { cancelled: false, uri(url,base64), width, height }
        
        // si sale bien, seteo imagen
        if (!result.cancelled) {
            setImage({ ...image, [number]: result.uri });
        };
    };

    // abrir camara
    const openCamera = async(number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
            // returns ---> { cancelled: false, type: 'image', uri, width, height, exif, base64 }
        
        if (!result.cancelled) {
            setImage({ ...image, [number]: result.uri });
        };
    };   

    
    return (
        <View>

            {/* OPEN GALLERY */}
            <View style={{direction: 'flex', flexDirection: 'row', marginBottom: 5}}>
                <TouchableOpacity onPress={ () => permisionFunction('gallery', 'one') }>
                    <Image style={styles.images} source={{ uri: image.one}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => permisionFunction('gallery', 'two') }>
                    <Image style={styles.images} source={{ uri: image.two}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => permisionFunction('gallery', 'three') }>
                    <Image style={styles.images} source={{ uri: image.three}} />
                </TouchableOpacity>
            </View>

            {/* OPEN CAMERA */}
            <View style={{direction: 'flex', flexDirection: 'row', marginBottom: 5}}>
                <View style={styles.openCamera}>
                    <Button title='CAMERA' onPress={ () => permisionFunction('camera', 'one') } />
                </View>
                <View style={styles.openCamera}>
                    <Button title='CAMERA' onPress={ () => permisionFunction('camera', 'two') } />
                </View>
                <View style={styles.openCamera}>
                    <Button title='CAMERA' onPress={ () => permisionFunction('camera', 'three') } />
                </View>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    images: {
        alignSelf: 'center', 
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        // borderStyle: 'solid',
        height: 100, 
        width: 100, 
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    openCamera: {
        marginLeft: 30,
        marginBottom: 5,
    }
});

export default ImageLibrary;
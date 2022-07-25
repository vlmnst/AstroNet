import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import img from '../../assets/logo/logoAstronet.png';
import mauroimg from '../../assets/imgAboutUs/mauroimg.png';
import valeimg from '../../assets/imgAboutUs/valeimg.png';
import erickimg from '../../assets/imgAboutUs/erickimg.png';
import crisimg from '../../assets/imgAboutUs/crisimg.png';
import juanimg from '../../assets/imgAboutUs/juanimg.png';
import marceimg from '../../assets/imgAboutUs/marceimg.png';
import alonsoimg from '../../assets/imgAboutUs/alonsoimg.png';

const AboutUs = ({ navigation, route }) => {
    
    const handlePress = async (prop) => {
        try {
            if(prop === 'valeria') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/valeria-mansueto-a78a22186/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/valeria-mansueto-a78a22186/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/valeria-mansueto-a78a22186/`);
                }
            } else if (prop === 'cris') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/cristian-valtelhas/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/cristian-valtelhas/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/cristian-valtelhas/`);
                }
            } else if (prop === 'marce') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/marcelo-litwin-43398848/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/marcelo-litwin-43398848/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/marcelo-litwin-43398848/`);
                }
            } else if (prop === 'agus') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/agustin-g%C3%B3mez-a73632209/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/agustin-g%C3%B3mez-a73632209/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/agustin-g%C3%B3mez-a73632209/`);
                }
            } else if (prop === 'mauro') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/mauro-nu%C3%B1ez-cioci-2a2980232/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/mauro-nu%C3%B1ez-cioci-2a2980232/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/mauro-nu%C3%B1ez-cioci-2a2980232/`);
                }
            } else if (prop === 'erick') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/erick-osterling-castillo-49b569104');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/erick-osterling-castillo-49b569104');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/erick-osterling-castillo-49b569104`);
                }
            } else if (prop === 'alonso') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/alonso-gordillo-925862222/');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/alonso-gordillo-925862222/');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/alonso-gordillo-925862222/`);
                }
            } else if (prop === 'juan') {
                const supported = await Linking.canOpenURL('https://www.linkedin.com/in/juan-manuel-cuevas-0799b616a');
                if (supported) {
                    await Linking.openURL('https://www.linkedin.com/in/juan-manuel-cuevas-0799b616a');
                } else {
                    Alert.alert(`Don't know how to open this URL: https://www.linkedin.com/in/juan-manuel-cuevas-0799b616a`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.conteiner}>
            <View style={styles.SBcontainer}>
                <View style={styles.SB}>
                    <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
                    <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>About Us</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={ styles.ScrollViewcontainer }>
                <View style={styles.imgcontainer}>
                    <Image style={styles.img} source={ img } />
                </View>
                <View style={styles.txtsContainer}>
                    <Text style={styles.txtTitle}>Group 7 ft 25 b</Text>
                    <Text style={styles.txtAbout}>This app is a project for an e-comerce, to sell tecnology oriented products.</Text>
                    <Text style={styles.txtIntegrants}>The project was made by:</Text>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ valeimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Valeria Mansueto</Text>
                            <TouchableOpacity onPress={() => handlePress('valeria')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ crisimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Cristian Valtelhas</Text>
                            <TouchableOpacity onPress={() => handlePress('cris')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ marceimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Marcelo Litwin</Text>
                            <TouchableOpacity onPress={() => handlePress('marce')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ img } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Agustin Gómez</Text>
                            <TouchableOpacity onPress={() => handlePress('agus')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ mauroimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Mauro Nuñez Cioci</Text>
                            <TouchableOpacity onPress={() => handlePress('mauro')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ erickimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Erick Osterling Castillo</Text>
                            <TouchableOpacity onPress={() => handlePress('erick')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ alonsoimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Alonso Gordillo</Text>
                            <TouchableOpacity onPress={() => handlePress('alonso')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                            <Image style={styles.cardimg} source={ juanimg } />
                        <View style={styles.cardtxts}>
                            <Text style={styles.cardinfo1}>Juan Manuel Cuevas</Text>
                            <TouchableOpacity onPress={() => handlePress('juan')}>
                                <Text style={styles.cardinfo2}>linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        alignItems:"center",
        maxWidth: '100%',
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    ScrollViewcontainer: {
        minHeight: '94%',
        maxHeight:'165%',
        minWidth:'100%',
        maxWidth:'100%',
    },
    imgcontainer: {
        height:'17%',
        maxWidth:'100%',
        alignItems:"center",
        justifyContent:"center",
        resizeMode:"contain",
        marginTop:'7%'
    },
    img: {
        height:'80%',
        width:'50%',
        borderWidth:1,
        borderColor:'black',
        borderRadius: 70,
        alignSelf:"center",
        resizeMode:"contain"
    },
    txtsContainer: {
        marginHorizontal:'1%',
    },
    txtTitle: {
        width:'100%',
        textAlign:'center',
        fontSize:30,
        fontWeight:"bold",
        fontStyle:"italic"
    },
    txtAbout: {
        textAlign:'center',
        fontSize:18,
        fontStyle:"italic",
        marginTop:'8%',
        marginHorizontal:'5%'
    },
    txtIntegrants: {
        textAlign:'center',
        fontSize:18,
        fontStyle:"italic",
        marginTop:'8%',
    },
    card: {
        height: '7%',
        marginHorizontal:'10%',
        backgroundColor:'#BDBDBD',
        borderRadius: 10,
        flexDirection:"row",
        marginTop:'5%',
        alignItems:"center"
    },
    cardimg: {
        maxHeight:'80%',
        maxWidth:'20%',
        resizeMode:"contain",
        borderRadius:150,
        marginHorizontal:'7%'
    },
    cardtxts: {

    },
    cardinfo1: {
        fontSize:17,
        fontStyle:"italic"
    },
    cardinfo2: {
        color:'#4A347F',
        fontSize:16,
        fontWeight:"600",
        fontStyle:"italic"
    },
});

export default AboutUs;
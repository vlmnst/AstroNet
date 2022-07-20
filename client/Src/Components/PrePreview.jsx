import { ScrollView, Text, View, Modal, TextInput,
         TouchableOpacity, Button, StyleSheet, SafeAreaView,
          Pressable, Image, 
        } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import ImageLibrary from '../ImageLibrary';
//import { ModifyProducts } from "../../../Redux/Slice";
import { useForm, Controller } from "react-hook-form";

const PrePreview = ({item}) => {

    //console.log(props);
    //const item = props.item
    console.log(item, 'ITEM');
    const dispatch = useDispatch();
    let categories = useSelector((item) => item.ALL_PRODUCTS.categories); 
    let pickerItems = [];
    categories.length
        ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
        : null;
    


    const [modalVisible, setModalVisible] = useState(false);

    return (

    <View >
        <View >      
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            
            >
            <View style={styles.modalBackground}>
                <Image source={{ uri: item.img[0] }} style={styles.image} />
                    <View style={styles.contInt}>
                        <View style={item.priceOffer}>
                            {item.offer > 0 ? (
                            <Text style={styles.pricethrough}>$ {item.price}</Text>)
                            : <Text style={styles.price}>$ {item.price}</Text>}
                            {item.offer > 0 ? (
                            <Text style={styles.offer}>{item.offer}% off!</Text>
                            ) : null}
                            {item.offer > 0 ? (
                            <Text style={styles.pricenew}>$ {item.price - (item.price * (item.offer/100))}</Text>
                            ) : null}
                        </View>
                        <View style={styles.descriptionCont}>
                        <Text style={styles.name}>{item.name} </Text>
                        <Text style={styles.name}>Categories: </Text>
                        {item.category? item.category.map((p,index)=>{
                                return(
                                    <View key={index}>
                                    <Text style={styles.description}>{p} </Text>
                                    </View>
                                )
                                
                                }
                            )
                            :<View style={styles.descriptionCont}><Text style={styles.name}>not categories loaded </Text></View>}

                        <Text style={styles.name}>Description: </Text> 
                            {item.description.map((p, index) => {
                                return (
                                    <Text style={styles.description} key={index}>
                                        {/* {p[0]}: {p[1]} */}
                                        {Object.keys(p)} : {Object.values(p)}
                                    </Text>
                                );
                            })}

                        <Text style={styles.name}>Detail: </Text>
                        <Text style={styles.description}>{item.detail}</Text>
                        </View>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Close Detail</Text>
                    </Pressable>
            </View>
                   
        </Modal>
        </View>
                    <View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>Show Preview</Text>
                    </Pressable>
                    </View>
    </View>        
       
    
    )
}

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;

const styles = StyleSheet.create({
    contDetails: {
        display: "flex",
        alignItems: "center",
        padding: 10,
        width: "100%",
        borderColor: "#EAEAEA",
        backgroundColor: "white",
    },
    border:{
        width:'70%',
        borderRadius:5,
        borderWidth:5,
        justifyContent:'center',
        alignItems:'center'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginBottom: 2,
        marginTop: 5,
        height: 200,
        width: 250,
        borderRadius: 10,
    },
    priceOffer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        fontSize: priceOfferFont,
        marginTop: 10
    },
    pricethrough: {
        fontSize: nameFont,
        textDecorationLine:'line-through'
    },
    price: { fontSize: priceOfferFont },
    offer: { color: "red", fontSize: priceOfferFont },  
    pricenew: {
        color: "green",
        fontSize: nameFont,
    },
    description: { fontSize: fontDescription, 
                     padding: 5, 
                     backgroundColor: "white", 
                     borderRadius: 5, 
                     borderColor: "#EAEAEA", 
                     marginHorizontal: 5, 
                     marginVertical: 5 
                    },
    descriptionCont: { display: "flex", 
                        flexDirection: "row", 
                        flexWrap: "wrap", 
                        justifyContent: "center" 
                    },
    name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10 },                
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default PrePreview;
import { Text, View, Modal, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageDetails from "./ImageDetails";

const PrePreview = ({item}) => {
    
    let categories = useSelector((item) => item.ALL_PRODUCTS.categories); 
    let pickerItems = [];
    categories.length
        ? categories.map((c) => pickerItems.push({ label: c, value: c }))
        : null;
    
    const [modalVisible, setModalVisible] = useState(false);
    const images = [];

    item.images.one === 'empty' ? null : images.push(item.images.one);
    item.images.two === 'empty' ? null : images.push(item.images.two) 
    item.images.three === 'empty' ? null : images.push(item.images.three) 

    return (
        <View>  

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >

            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Close Detail</Text>
            </Pressable>

            <View style={styles.modalBackground} >

                <Text style={styles.name}>{item.name} </Text>
                    <ImageDetails images={images}/>
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
                                <Text style={styles.name}>Categories: </Text>
                                {item.category? item.category.map((p,index)=>{
                                    return(
                                        <View key={index}>
                                        <Text style={styles.description}>{p} </Text>
                                        </View>
                                    )
                                    
                                    }
                                )
                                :   <View style={styles.descriptionCont}><Text style={styles.name}>not categories loaded </Text></View>}

                                <Text style={styles.name}>Description: </Text> 
                                    {item.description? item.description.map((p, index) => {
                                        return (
                                            <Text style={styles.description} key={index}>
                                                {Object.keys(p)} : {Object.values(p)}
                                            </Text>
                                        );
                                    }):null}

                                <Text style={styles.name}>Detail: </Text>
                                <Text style={styles.description}>{item.detail}</Text>
                            </View>

                        </View>

            </View>     
            </Modal>

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
        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
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
    price: { fontSize: priceOfferFont, color: 'green', fontSize: 20, },
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
    name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10, color: 'white' },                
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
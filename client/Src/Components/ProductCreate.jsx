import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FeatherIcon from 'react-native-vector-icons/Feather';

import ImageLibrary from "./ImageLibrary";
import { createProduct } from "../../Redux/Slice";

const ProductCreate = ({navigation}) => {
    
    const dispatch = useDispatch();

    // reducer state
    let categoriesReducer = useSelector((state) => state.ALL_PRODUCTS.categories);

    // local states
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [offer, setOffer] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('image');
    const [categories, setCategories] = useState([]);

    // picker categories
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    let pickerItems = [];
    categoriesReducer.length
        ? categoriesReducer.map(c => pickerItems.push({ label: c, value: c }))
        : null;


    // ------ HANDLERS ------
    function handleCategory(e) {
        if (!categories.includes(e.value)) {
            setCategories(
                [...categories, e.value]
            )
        } else {
            setCategories([...categories.filter(c => c !== e.value)])
        };
        // console.log(categories);
    };

    function submitForm() {
        if (!name || !price ||!stock || !offer || !description || categories.length < 1) {
            return alert('empty fields')
        };

        const product = {
            name, price, stock, offer, 
            description: { description },
            category: categories, 
            img: images,
        };
        // console.log(product)
        try {
            dispatch(createProduct(product));
            // console.log(product)
            clearInputs();
        } catch (error) {
            alert(error);
        };
    };

    function clearInputs(){
        setName('');
        setPrice('');
        setStock('');
        setOffer('');
        setDescription('');
        setCategories([]);
    };


    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.SBcontainer}>
				<View style={styles.SB}>
					<FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>Create a new product</Text>
				</View>
			</View>
            {/* <Text style={{fontSize: 20, marginVertical: 10}}>Create a new product</Text> */}

            {/* NAME */}
            <View style={styles.inputsContainers}>
                <TextInput transparent
                    style={styles.inputs}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                />
            </View>

            {/* PRICE */}
            <View style={styles.inputsContainers}>
                <TextInput transparent
                    style={styles.inputs}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Price"
                />
            </View>

            {/* STOCK */}
            <View style={styles.inputsContainers}>
                <TextInput transparent
                    style={styles.inputs}
                    onChangeText={setStock}
                    value={stock}
                    placeholder="Stock"
                />
            </View>

            {/* OFFER */}
            <View style={styles.inputsContainers}>
                <TextInput transparent
                    style={styles.inputs}
                    onChangeText={setOffer}
                    value={offer}
                    placeholder="Offer"
                />
            </View>

            {/* DESCRIPTION */}
            <View style={styles.descriptionContainer}>
                <TextInput transparent
                    style={styles.descriptionInput}
                    multiline={true}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Enter a description..."
                />
            </View>

            {/* IMAGES */}
            <Text style={{fontSize: 15, marginTop: 15}}>Select images</Text>
            <ImageLibrary />

            {/* CATEGORIES */}
            <Text style={{fontSize: 15 }}>Select categories</Text>
            <View style={styles.inputsContainers}>
                <DropDownPicker
                    style={{marginVertical: 10}}
                    open={openitems}
                    value={valueitems}
                    items={pickerItems}
                    setOpen={setOpenitems}
                    setValue={setValueitems}
                    onSelectItem={(value) => handleCategory(value)}
                />
            </View>

            {/* CATEGORIES CONTAINER */}
            <View style={styles.categoriesContainer}>
                { categories 
                    ? categories.map((c, index) => {
                        return (
                            <View style={styles.categoriesLabel} key={index} >
                                <Text>{c}</Text>
                            </View>
                        )
                    })
                    : (null)
                }
            </View>

            {/* CREATE BUTTON */}
            <View style={{width: '50%', marginBottom: 15}}>
                <Button title="Create Product" onPress={() => submitForm()}/>
            </View>
            
        </ScrollView>
    ); 
};

const styles = StyleSheet.create({
    container:{
        // flex: 1, 
        width: '100%',
        alignItems: 'center',
        minHeight:'100%'
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%',
        marginBottom:'5%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        // backgroundColor:'white',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    inputsContainers: {
        width: '50%'
    },
    inputs: { 
        padding: 5, 
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        marginTop: 10,
    },
    descriptionContainer: {
        width: '70%',
    },
    descriptionInput: {
        height: 75,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        marginTop: 10,
        padding: 5, 
    },
    categoriesContainer: {
        flexWrap: 'wrap',
        width: '80%',
        padding: 5,
        height: 108,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    categoriesLabel: {
        backgroundColor: 'rgba(0, 100, 255, 0.5)',
        width: '30%',
        height: '30%',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 2,
        marginHorizontal: 5,
    },
});

export default ProductCreate;
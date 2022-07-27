import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import IconIonicons from 'react-native-vector-icons/Ionicons';

import ImageLibrary from "./ImageLibrary";
import PrePreview from "./PrePreview";
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
    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState({
        one: 'empty',
        two: 'empty',
        three: 'empty',
    });

    // picker categories
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    let pickerItems = [];
    categoriesReducer.length
        ? categoriesReducer.map(c => pickerItems.push({ label: c, value: c }))
        : null;
    
    const [product, setProduct] = useState({
        name, price, offer, stock, detail, description, category: categories, images
    })


    // update preview
    useEffect(() => {
        setProduct({
            name, price, offer, stock, detail, description, category: categories, images
        })
        }, [name, price, stock, offer, detail, description, categories, images]);

    // ------ HANDLERS ------
    function handleCategory(e) {
        if (!categories.includes(e.value)) {
            setCategories(
                [...categories, e.value]
            )
        } else {
            setCategories([...categories.filter(c => c !== e.value)])
        };
    };

    // add new attribute
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    
    const createDescription = (e) => {
        if (key === '' || value === '') return alert ('enter new key:value for the attribute');
        const newAttribute = {[key]:value}
        setDescription([...description, newAttribute]); 
        setKey('');
        setValue('');
        alert('attribute added');
    };
    

    function clearInputs(){
        setName('');
        setPrice('');
        setStock('');
        setOffer('');
        setDescription('');
        setDetail('');
        setCategories([]);
        setImages({ one: 'empty', two: 'empty', three: 'empty' })
    };

    function submitForm() {
        if (!name || !price ||!stock || !offer || !description || categories.length < 1) {
            return alert('empty fields')
        };

        if (images.one === 'empty' && images.two === 'empty' && images.three === 'empty') {
            return alert('upload one image at least')
        };

        const product = {
            name, price, stock, offer, detail, description,
            category: categories, 
            img: [images.one, images.two, images.three],
        };
        dispatch(createProduct(product));
        clearInputs();
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.SBcontainer}>
				<View style={styles.SB}>
                    <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>Create a new product</Text>
				</View>
			</View>

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

            {/* DETAIL */}
            <View style={styles.descriptionContainer}>
                <TextInput transparent
                    style={styles.descriptionInput}
                    multiline={true}
                    onChangeText={setDetail}
                    value={detail}
                    placeholder="Enter a detail..."
                />
            </View>

            {/* NEW ATTRIBUTE DESCRIPTION */}
            <Text style={{fontSize: 15, marginTop: 10 }}>Add new attribute</Text>
                <View style={styles.inputsContainers}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setKey}
                            value={key}
                            placeholder="Name of attribute..."
                        />
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setValue}
                            value={value}
                            placeholder="Value of attribute..."
                        />
                    </View>
                    <Button title="Add new attribute" onPress={() => createDescription()} />
                </View>

            {/* IMAGES */}
            <Text style={{fontSize: 15, marginTop: 15}}>Add images</Text>
            <ImageLibrary images={images} setImages={setImages} />

            {/* CATEGORIES */}
            <Text style={{fontSize: 15 }}>Add categories</Text>
            <View style={styles.inputsContainers}>
                <DropDownPicker
                    style={{marginVertical: 10, elevation: 3, zIndex: 0}}
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
            <View style={{width: '50%', marginBottom: 80}}>
                <PrePreview item={product}/>
                <Button title="Create Product" onPress={() => submitForm()}/>
            </View>
    
        </ScrollView>
    ); 
};

const styles = StyleSheet.create({
    container:{
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
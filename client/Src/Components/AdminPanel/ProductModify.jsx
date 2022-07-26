import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getAllProducts, ModifyProducts, clearCache, setPageScrollinf, setpaginateProducts} from "../../../Redux/Slice";
import ImageLibrary from '../ImageLibrary';
import PrePreview from '../PrePreview';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const ProductModify = (props) => {
    // console.log('------------------------')
    // console.log('PRODUCT MODIFY',props.route.params);
    let item
    let allproductsroute = false
    // const { item, setPage, setpaginateProducts} = props.route.params
    if(props.route.params.item){
        item = props.route.params.item
        allproductsroute = false
    } else if (props.route.params.route.params.item){
        item = props.route.params.route.params.item
        allproductsroute = true
    } else {
        item = props.route.params.route.params
        allproductsroute = true
    }
    const dispatch = useDispatch();

    // reducer states
    // let item = props.route.params;
    let categoriesReducer = useSelector((state) => state.ALL_PRODUCTS.categories); 

    // picker states
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    let pickerItems = [];
    categoriesReducer.length
        ? categoriesReducer.map(c => pickerItems.push({ label: c, value: c }))
        : null;

    // local states
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [stock, setStock] = useState(item.stock);
    const [offer, setOffer] = useState(item.offer);
    const [detail, setDetail] = useState(item.detail);
    const [description, setDescription] = useState(item.description);
    const [categories, setCategories] = useState(item.category);
    const [images, setImages] = useState({
        one: item.img[0] ? item.img[0] : 'empty',
        two: item.img[1] ? item.img[1] : 'empty',
        three: item.img[2] ? item.img[2] : 'empty',
    });

    const [product, setProduct] = useState({
        name, price, offer, stock, detail, description, category: categories, images
    })


    // update preview
    useEffect(() => {
        setProduct({
            name, price, offer, stock, detail, description, category: categories, images
        })
      }, [name, price, stock, offer, detail, description, categories, images]);

    // handlers
    function handleCategory(e) {
        if (!categories.includes(e.value)) {
            setCategories(
                [...categories, e.value]
            )
        } else {
            setCategories([...categories.filter(c => c !== e.value)])
        };
    };

    async function submitForm() {
        try {
        if (!name || !price ||!stock || !offer || !description || !detail || categories.length < 1) {
            return alert('empty fields')
        };

        if (images.one === 'empty' && images.two === 'empty' && images.three === 'empty') {
            return alert('upload one image at least')
        };
        dispatch(clearCache());
        // setpaginateProducts([]),
        // setPage(0);
        dispatch(setPageScrollinf(0))
        dispatch(setpaginateProducts([]))
        const payload = {
            id: item.id,
            product: {
                name, price, stock, offer, detail, description,
                category: categories, 
                img: [images.one, images.two, images.three],
            }
        };
            await dispatch(ModifyProducts(payload));
        } catch (error) {
            console.log(error)
        }
        dispatch(getAllProducts());
        alert('updated successfully');
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
    };

    function handleGoBack () {
        if(allproductsroute === true) {
            // console.log(props)
            props.navigation.pop(2);
        } else {
            props.navigation.goBack()
        }
    }

    return (
        <View style={{minHeight:'100%', width:'100%', backgroundColor:'white'}}>

            <View style={styles.SBcontainer}>
                <View style={styles.SB}>
                    <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => handleGoBack()}/>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.container}>

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
                        onChangeText={setDetail}
                        value={detail}
                        placeholder="Enter details..."
                    />
                </View>

                {/* IMAGES */}
                <Text style={{fontSize: 15, marginTop: 15}}>Add images</Text>
                <ImageLibrary images={images} setImages={setImages} />

                {/* CATEGORIES */}
                <Text style={{fontSize: 15 }}>Add categories</Text>
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

                {/* NEW ATTRIBUTE */}
                <Text style={{fontSize: 15 }}>Add new attribute</Text>
                <View style={styles.inputsContainers}>
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

                <PrePreview item={product}/>
                <Button title="Add new attribute" onPress={() => createDescription()} />
                <Button title="Modify Product" onPress={() => submitForm()}/>
                <View style={{marginBottom:'30%'}}/>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%',
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
    container:{
        minHeight:'100%',
        width: '100%',
        alignItems: 'center',
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
        height:75,
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

export default ProductModify;
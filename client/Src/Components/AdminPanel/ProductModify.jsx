import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView,TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { ModifyProducts } from "../../../Redux/Slice";
import Icon from 'react-native-vector-icons/Ionicons';
import ImageLibrary from '../ImageLibrary';
import PrePreview from '../PrePreview';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ProductModify = (props) => {
    // console.log(props);
    const dispatch = useDispatch();
    let item = props.route.params;
    let categories = useSelector((state) => state.ALL_PRODUCTS.categories); 
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    let pickerItems = [];
    categories.length
        ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
        : null;
    const [key, setKey] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState({
        id: item.id,
        category: item.category,
        name: item.name,
        price: item.price,
        img: item.img,
        stock: item.stock,
        offer: item.offer,
        description: item.description,
        detail: item.detail,
    });

    function handleCategory(e) {
        if (!state.category.includes(e.value)) {
            setState({
                ...state,
                category: [...state.category, e.value]
            })
        } else {
            setState({
                ...state,
                category: state.category.filter(c => c !== e.value)
            })
        };
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: item.name,
            price: item.price,
            img: item.img,
            stock: item.stock,
            offer: item.offer,
            description: item.description,
            detail: item.detail
        }
    });
    let product = {
        name: "",
        category: "",
        img: "",
        price: "",
        offer: "",
        stock: "",
        description: {},
        detail: "",
    }

    const onSubmitPreview = data => {
        if (state.category.length < 1) {
            alert('Enter a category')
        } else {
                product = {
                name: data.name,
                category: state.category,
                img: data.img,
                price: data.price,
                offer: data.offer,
                stock: data.stock,
                description: state.description ,
                detail: data.detail,
            }
            setState({
                ...state,
                id: product.id,
                category: product.category,
                name: product.name,
                price: product.price,
                img: product.img,
                stock: product.stock,
                offer: product.offer,
                description: product.description,
                detail: product.detail,
            })
            key ? createDescription():null
        }
        
    }
    

    const onSubmit = () => {
        const payload ={
            id: item.id,
            product:{
                category: state.category,
                name: state.name,
                price: state.price,
                img: state.img,
                stock: state.stock,
                offer: state.offer,
                description: state.description,
                detail: state.detail,
            }
        }
        dispatch(ModifyProducts(payload));
    }
    function filterDescription(e) {
        setDescription(e)
    };
    function filterKey(e) {
        setKey(e)
    };
    const createDescription = (e) => {
        // let result ={}
        // resultarray =descriptionArray
        let resultarray = item.description;
        resultarray.push([key,description])
        // resultarray.forEach(par =>result[par[0]] = par[1])
        // result[key] = description
        setState({
            ...state,
            description: resultarray
        })
    }

    // descriptionArray = Object.entries(state.description)

    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={{minHeight:'100%', width:'100%', backgroundColor:'white'}}>
            <View style={styles.SBcontainer}>
                <View style={styles.SB}>
                    <FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => props.navigation.goBack()}/>
                    {/* <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>Create a new product</Text> */}
                </View>
            </View>
            <Image source={{ uri: state.img[0] }} style={styles.image} />
            <ScrollView style={{height:'10%'}}>
                {/* <View style={styles.contimg}> */}
                {/* </View> */}
                <View >
                    <DropDownPicker
                        style={styles.DropDownPicker}
                        open={openitems}
                        value={valueitems}
                        items={pickerItems}
                        setOpen={setOpenitems}
                        setValue={setValueitems}
                        onSelectItem={(value) => handleCategory(value)}
                    />
                </View>
                {errors.category && <Text>Insert category name</Text>}
                <View style={styles.ImageLibrary}>
                    <Text style={styles.txt}>Add image:</Text>
                    {/* <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="img"
                    />
                    {errors.img && <Text>Insert URL image </Text>} */}
                    <ImageLibrary />
                </View>
                <View style={styles.Controllercont}>
                    <Text style={styles.txt}>Product stock:</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            min: 1,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="stock"
                    />
                {errors.stock && <Text>Insert stock value</Text>}
                </View>
                <View style={styles.Controllercont}>
                <Text style={styles.txt}>Product offer:</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        min: 0, max: 99,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.textInput}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="offer"
                />
                {errors.offer && <Text>Insert offer value</Text>}
                </View>
                <View style={styles.Controllercont}>
                    <Text style={styles.txt}>Name of description: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => filterKey(text)}
                        value={description.key}
                    />
                    <Text style={styles.txt}>value of description: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => filterDescription(text)}
                        value={description.value}
                    />
                </View>
                {/* <Separator /> */}
            </ScrollView>
            <Button title="Modification Preview" onPress={handleSubmit(onSubmitPreview)} />
            <Button title="Modify Product" onPress={()=>{onSubmit()}} />
            <PrePreview item={state}/>
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
    // contimg: {
    //     alignItems: "center",
    //     padding: 10,
    //     width: "100%",
    //     height:'30%',
    //     // borderColor: "#EAEAEA",
    //     backgroundColor: "white",
    // },
    image: {
        height: '20%',
        // width: '100%',
        resizeMode:"contain"
    },
    DropDownPicker: {
        width:'80%',
        alignSelf:"center"
    },
    ImageLibrary: {
        height:'35%',
        width:'80%',
        alignSelf:"center"
        // backgroundColor:'black',
    },
    txt: {
        fontSize:18,
        marginVertical:10
    },
    Controllercont: {
        height:'15%',
        width:'80%',
        alignSelf:"center"
        // backgroundColor:'black'
    },
    textInput:{
        borderWidth:2,
        borderRadius:10,
        borderColor:'grey'
    },
});

export default ProductModify;
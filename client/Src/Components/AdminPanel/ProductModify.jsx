import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView,TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { ModifyProducts } from "../../../Redux/Slice";
import Icon from 'react-native-vector-icons/Ionicons';

const ProductModify = (props) => {

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
                description: state.description
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
        let result ={}
        resultarray =descriptionArray
        resultarray.push([key,description])
        resultarray.forEach(par =>result[par[0]] = par[1])
        result[key] = description
        setState({
            ...state,
            description: result
        })
    }

    descriptionArray = Object.entries(state.description)

    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <ScrollView>

            <View style={styles.contDetails}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={styles.text}>Go Back</Text>
                </TouchableOpacity>
                <Image source={{ uri: state.img }} style={styles.image} />
                <View style={styles.contInt}>
                    <View style={state.priceOffer}>
                        {state.offer > 0 ? (
                        <Text style={styles.pricethrough}>$ {state.price}</Text>)
                        : <Text style={styles.price}>$ {state.price}</Text>}
                        {state.offer > 0 ? (
                          <Text style={styles.offer}>{state.offer}% off!</Text>
                        ) : null}
                         {state.offer > 0 ? (
                          <Text style={styles.pricenew}>$ {state.price - (state.price * (state.offer/100))}</Text>
                        ) : null}
                    </View>
                    <View style={styles.descriptionCont}>
                    <Text style={styles.name}>{state.name} </Text>
                    <Text style={styles.name}>Categories: </Text>
                    {state.category? state.category.map((p,index)=>{
                            return(
                                <View key={index}>
                                <Text style={styles.description}>{p} </Text>
                                </View>
                            )
                            
                            }
                        )
                        :<View style={styles.descriptionCont}><Text style={styles.name}>not categories loaded </Text></View>}
                        
                        {descriptionArray.map((p, index) => {
                            return (
                                <Text style={styles.description} key={index}>
                                    {p[0]}: {p[1]}
                                </Text>
                            );
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.Container_}>
            <Text>Product name:</Text>
            <Controller
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
                name="name"
            />
            {errors.name && <Text>Insert product name</Text>}
            </View>
            <View style={styles.Container_}>
            <Text>Product price:</Text>
            <Controller
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
                name="price"
            />
            {errors.price && <Text>Insert price value</Text>}
            </View>
            <View style={styles.Container_}><Text>Product category:</Text></View>
            <View style={styles.descriptionCont}>
            {state.category? state.category.map((p,index)=>{
                            return(
                                <View style={styles.Container_}key={index}>
                                <Text style={styles.name}>{p} </Text>
                                </View>
                            )
                            
                            }
                        )
                        :<View style={styles.descriptionCont}><Text style={styles.name}>not categories loaded </Text></View>}
            </View>
            <DropDownPicker
                style={styles.Container_}
                open={openitems}
                value={valueitems}
                items={pickerItems}
                setOpen={setOpenitems}
                setValue={setValueitems}
                onSelectItem={(value) => handleCategory(value)}
            />
            {errors.category && <Text>Insert category name</Text>}
            <View style={styles.description}>
            <Text>Product image:</Text>
            <Controller
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
            {errors.img && <Text>Insert URL image </Text>}
            </View>
            <View style={styles.Container_}>
            <Text>Product stock:</Text>
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
            <View style={styles.Container_}>
            <Text>Product offer:</Text>
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
            <View style={styles.Container_}>
                <Text>Name of description: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => filterKey(text)}
                    value={description.key}
                />
                <Text>value of description: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => filterDescription(text)}
                    value={description.value}
                />
            </View>
            <Separator />
            <Button title="Modification Preview" onPress={handleSubmit(onSubmitPreview)} />
            <Button title="Modify Product" onPress={()=>{onSubmit()}} />
        </ScrollView>
    );
};

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;

const styles = StyleSheet.create({
    AndroidSafeArea: { paddingTop: StatusBar.currentHeight + 10 },
    container: { flex: 1, justifyContent: 'center', marginHorizontal: 16, backgroundColor: '#5E5E5E' },
    input: { backgroundColor: '#FFFFFF', marginTop: 0, marginHorizontal: 10, padding: 5, width: '100%' },
    inputmul: { backgroundColor: '#FFFFFF', marginTop: 10, marginHorizontal: 10, padding: 5, height: 100, width: '100%' },
    title: { fontSize: 20, padding: 5, marginLeft: 10 },
    separator: { marginVertical: 8, borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth },
    button: { height: 40, margin: 12, borderWidth: 1, padding: 10 },
    priceOffer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        fontSize: priceOfferFont,
        marginTop: 10
    },
    image: {
        marginBottom: 2,
        marginTop: 5,
        height: 200,
        width: 250,
        borderRadius: 10,
    },
    contDetails: {
        display: "flex",
        alignItems: "center",
        padding: 10,
        width: "100%",
        borderColor: "#EAEAEA",
        backgroundColor: "white",
    },
    contInt: { marginTop: 5, width: "98%", backgroundColor: "#EAEAEA" },
    price: { fontSize: priceOfferFont },
    name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10 },
    offer: { color: "red", fontSize: priceOfferFont },
    descriptionCont: { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
    description: { fontSize: fontDescription, padding: 5, backgroundColor: "white", borderRadius: 5, borderColor: "#EAEAEA", marginHorizontal: 5, marginVertical: 5 },
    textInput: { height: 40, width: "90%", borderWidth: 1, borderRadius: 8, borderColor: "#A09E9E", backgroundColor: "#D0D0D0", marginBottom: 2 },
    Container_: {  marginBottom: 1, boderWidth: 1, borderColor: "#A09E9E", marginHorizontal: 15 },
    pricethrough: {
        fontSize: nameFont,
        textDecorationLine:'line-through'
      },
      pricenew: {
        color: "green",
        fontSize: nameFont,
      },
});

export default ProductModify;
import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar,Image,ScrollView} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { ModifyProducts } from "../../../Redux/Slice";

const ProductModify = (props) => {

    const dispatch = useDispatch();
    let item = props.route.params;
    // PROBANDO CATEGORIES EN ARRAY
    let categories = useSelector((state) => state.ALL_PRODUCTS.categories); // categories === ['', '', '']

    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    let pickerItems = [];
    categories.length
        ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
        : null;


    console.log(item)


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
    // PROBANDO CATEGORIES EN ARRAY

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
    const onSubmitPreview = data => {
        if (state.category.length < 1) {
        alert('Enter a category')
        } else {
            const product = {
                name : data.name,
                category: state.category,
                img: data.img,
                price: data.price,
                offer: data.offer,
                stock: data.stock,
                description: {Description: data.description}
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
        }
    }

    const onSubmit = () => {
        // dispatch(ModifyProducts(product));
        console.log("hola")
    };

    descriptionArray = Object.entries(item.description)

    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <ScrollView>

            <View style={styles.contDetails}>
                <Image source={{ uri: state.img }} style={styles.image} />
                <View style={styles.contInt}>
                    <View style={state.priceOffer}>
                        <Text style={styles.price}>$ {state.price}</Text>
                        {state.offer > 0 ? (
                            <Text style={styles.offer}>{state.offer}% off!</Text>
                        ) : null}
                    </View>
                    <View style={styles.descriptionCont}>
                        {/* {state.category? state.category.map((p,index)
                        <Text style={styles.name}>{state.name}: </Text> 
                        )} */}
                        <Text style={styles.name}>{state.name}: </Text>
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


            <Text>Product name:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="name"
            />
            {errors.name && <Text>Insert product name</Text>}

            <Text>Product price:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="price"
            />
            {errors.price && <Text>Insert price value</Text>}

            <Text>Product category:</Text>
            <DropDownPicker
                open={openitems}
                value={valueitems}
                items={pickerItems}
                setOpen={setOpenitems}
                setValue={setValueitems}
                onSelectItem={(value) => handleCategory(value)}
            />
            {errors.category && <Text>Insert category name</Text>}

            <Text>Product image:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="img"
            />
            {errors.img && <Text>Insert URL image </Text>}

            <Text>Product stock:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                    min: 1,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="stock"
            />
            {errors.stock && <Text>Insert stock value</Text>}

            <Text>Product offer:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                    min: 0, max: 99,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="offer"
            />
            {errors.offer && <Text>Insert offer value</Text>}

            <Text>Product description:</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.inputmul}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="description"
            />
            {errors.description && <Text>Insert product description</Text>}

            <Separator />

            <Button title="Modification Preview" onPress={handleSubmit(onSubmitPreview)} />
            {/* <Button title="Modify Product" onPress={onSubmit()} /> */}
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
});

export default ProductModify;
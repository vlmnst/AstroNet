import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";

import { createProduct } from "../../Redux/Slice";

const ProductCreate = () => {

  const dispatch = useDispatch();

// PROBANDO CATEGORIES EN ARRAY
  let categories = useSelector((state) => state.ALL_PRODUCTS.categories); // categories === ['', '', '']

  const [openitems, setOpenitems] = useState(false);
  const [valueitems, setValueitems] = useState(null);
  let pickerItems = [];
  categories.length
    ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
    : null;

  const [state, setState] = useState({
    category: [],
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
    console.log(state.category);
  };
// PROBANDO CATEGORIES EN ARRAY

  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        name: '',
        price: '',
        img: '',
        stock: '',
        offer: '',
        description: '',
      }
  });

    const onSubmit = data => {
        if (state.category.length < 1) {
          alert('Enter a category')
        } else {
          const product = {
            name: data.name,
            category: state.category,
            img: data.img,
            price: data.price,
            offer: data.offer,
            stock: data.stock,
            description: {Description: data.description}
          }
          dispatch(createProduct(product));
          // console.log(product);
        };   
    };
      
    const Separator = () => (
        <View style={styles.separator} />
    );

    return(
        <View>
        <SafeAreaView style={styles.AndroidSafeArea} >

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

        <Separator/>

        <Button title="Create Product" onPress={handleSubmit(onSubmit)} />

      </SafeAreaView>
      </View>
    ); 
};


const styles = StyleSheet.create({
  AndroidSafeArea: { paddingTop: StatusBar.currentHeight + 10 },
  container:{flex: 1, justifyContent: 'center', marginHorizontal: 16, backgroundColor: '#5E5E5E'},
  input: { backgroundColor: '#FFFFFF', marginTop: 0, marginHorizontal: 10, padding: 5, width: '100%' },
  inputmul: { backgroundColor: '#FFFFFF', marginTop: 10, marginHorizontal: 10, padding: 5, height: 100, width: '100%' },
  title: { fontSize: 20, padding: 5, marginLeft: 10 },
  separator: { marginVertical: 8, borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth },
  button: { height: 40, margin: 12, borderWidth: 1, padding: 10 },
});

export default ProductCreate;
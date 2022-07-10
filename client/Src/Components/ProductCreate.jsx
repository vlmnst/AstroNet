import React from "react";
import { useDispatch } from "react-redux";
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { createProduct } from "../../Redux/Slice";

const ProductCreate = () => {

  const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          name: '',
          price: '',
          category: '',
          img: '',
          stock: '',
          offer: '',
          description: '',
        }
    });

    const onSubmit = data => {
        console.log(data);
        dispatch(createProduct(data));
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
          name="category"
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
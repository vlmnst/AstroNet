import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, useWindowDimensions,Button} from "react-native";

const Categories = (navigation) => {
    let categories = useSelector((state) => state.ALL_PRODUCTS.categories);
    const keyExtractor = useCallback((item)=>{
        return item;
    },[]);

    return(
        <View>
            <FlatList
            horizontal= {true}
            numColumns={1}
            data={categories}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
                <View style={styles.container}>
                <Button
                    title={item}
                    onPress = { ()=>{navigation.navigate('Allproducts',item)}}>
                </Button>
                    {/* <Text>{item}</Text> */}
                </View>
            )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{alignItems: 'center', margin:"2%", padding: 5, borderWidth: 2, heigth:100,width: 150, borderColor: "#EAEAEA", backgroundColor:"white", borderRadius:15 },
})

export default Categories;
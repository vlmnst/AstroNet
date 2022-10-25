import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';

import Cart from "../Components/Cart";
import { undoItemWishList } from "../../Redux/Slice";

const WishListLobby = (props) => {
    const { route } = props;
    const { navigation } = props

    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.ALL_PRODUCTS.wishList)

    const deleteItem = (item) => {
        dispatch(undoItemWishList(item.id))
    }
   
    return (
        <View style={styles.container}>
            <View style={styles.SBcontainer}>
                <View style={styles.SB}>
                <FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>WishList</Text>
        </View>
        </View>
            <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={wishlist}
                renderItem={({item}) => (
                    <View style={styles.movieCard}>
                        <TouchableOpacity onPress={() => deleteItem(item)} style={styles.addCart}>
                            <Icon style={styles.iconHeart} name="delete" size={20}  />
                        </TouchableOpacity>
                       <Image resizeMode="contain" style={{ width: 100, height: 100 }}
                             source={{ uri: item.img[0] }}
                        />
                       <Text style={styles.cartText}>
                            {item.name.slice(0, 15)}...
                        </Text>
                         <View style={styles.addcartbtn}>
                             <Cart navigation={route} item={item}/>
                         </View>
                    </View>
                )} 
            />
        </View>
    )
}



const styles = StyleSheet.create({
    cartText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '60%',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center'
      },
    addcartbtn: {
        width:'20%',
        justifyContent:"center",
        alignItems:"center",
        height:160},
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    },
    movieCard:{
        width: Dimensions.get('screen').width-10,
        height: 100,
        width:"85%",
        backgroundColor: '#FFF',
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    SBcontainer: {
        height: '10%',
        backgroundColor: '#4A347F',
        width: '100%'
    },
    SB: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: '82%',
        backgroundColor: '#4A347F',
        width: '100%',
        marginTop: '4%'
    },
    iconMenu: {
        color: 'white',
        position: 'absolute',
        left: '5%'
    }
});

export default WishListLobby;
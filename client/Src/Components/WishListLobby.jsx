import { Text, View, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishListComming } from "../../Redux/Slice";
import Icon from 'react-native-vector-icons/AntDesign';


import Cart from "../Components/Cart";
import FeatherIcon from 'react-native-vector-icons/Feather';

const WishListLobby = (props) => {
    const { route } = props;
    const { params } = route;
    const { navigation } = props

    // const [userData, setUserData] = useState();

    const dispatch = useDispatch();
    // const userName = useSelector(state => state.USER.userName)
    const wishlist = useSelector(state => state.ALL_PRODUCTS.wishList)
    //const data = wishlist[0]

    // useEffect(() => {
    //     dispatch(wishListComming(userName))
    // }, []);
  

    //console.log(wishlist);
    const onClickDeleteDataWishList = () => {

    }
   
    return (
        <View style={styles.container}>
            <View style={styles.SBcontainer}>
                <View style={styles.SB}>
                <FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>WishList</Text>
        </View>
      </View>
            <Text style={{ fontSize:30, fontWeight: '600', color: 'gray', marginLeft: 20, marginBottom: 20 }}>
               
            </Text>
            <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={wishlist}
                renderItem={({item}) => (
                    <View style={styles.movieCard}>
                        {/* <TouchableOpacity
                            onPress={() => onClickDeleteDataWishList(item)}
                            style={styles.addCart}
                        >
                            <Icon style={styles.iconHeart} name="delete" size={20}  />
                        </TouchableOpacity> */}
                       <Image resizeMode="contain" style={{ width: 100, height: 100 }}
                             source={{ uri: item.img[0] }}
                             />
                       <Text style={styles.cartText}>
                            {item.name}
                        </Text>
                         <View style={styles.addcartbtn}>
                             <Cart navigation={route}  />
                         </View>
                    </View>
                )} 
            />
        </View>
    )
}



const styles = StyleSheet.create({
    cartText: {
        fontSize: 10,
        fontWeight: 'bold',
        width: '60%',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center'
      },
    addcartbtn: {
        width:'20%',
        justifyContent:"center",
        alignItems:"center",
        height:160},
    container: {
        //paddingTop: 50,
        //display: 'flex',
        flex: 1,
        //justifyContent: 'flex-start',
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
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishListAddInfo } from "../../Redux/Slice";
import { getCredentials } from "../utils/handleCredentials";
import { wishListComming } from "../../Redux/Slice";
import Icon from 'react-native-vector-icons/Ionicons';

const wishListButton = (props) => {
    const dispatch = useDispatch();
    const { navigation, item } = props;
    const [userData, setUserData] = useState();
    const userName = useSelector(state => state.USER.userName)

    useEffect(() => {
        const checkCreds = async () => {
          const credentials = await getCredentials();
          if (credentials) {
            setUserData(credentials.username)
          } 
        };
        checkCreds(); 
    }, []);
    //console.log(userData);
    
    const onClickAddInWishList = (data) => {
        const itemID =  data.id;
        const info = {itemId : itemID, user : userData};

        dispatch(wishListAddInfo(info))
        dispatch(wishListComming(userName))
    }



    return (
        <TouchableOpacity
          onPress={() => onClickAddInWishList(item)}
          style={styles.addCart}
        >
        <Icon style={styles.addCartText} name="heart-outline" size={30}  />
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    addCart: {
      alignItems: "center",
      alignSelf:"flex-end",
      backgroundColor: "#4A347F",
      alignItems: "center",
      padding: 5,
      borderRadius: 5,
      color: "white",
    },
    addCartText: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
    },
  });
  
  export default wishListButton;
  
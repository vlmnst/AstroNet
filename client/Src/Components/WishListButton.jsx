import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishListCreate } from "../../Redux/Slice";
import { getCredentials } from "../utils/handleCredentials";

const wishListButton = (props) => {
    const dispatch = useDispatch();
    const { navigation, item } = props;
    const [userID, setUserID] = useState();

    useEffect(() => {
        const checkCreds = async () => {
          const credentials = await getCredentials();
          if (credentials) {
            setUserID(credentials.id)
          }
        };
        checkCreds();
    }, []);
    console.log(userID)

    const onClickAddInWishList = (data, userID) => {
        const itemID = { id: data.id };
        
        dispatch(wishListCreate(itemID));
    }
    


    return (
        <TouchableOpacity
          onPress={() => onClickAddInWishList(item)}
          style={styles.addCart}
        >
          <Text style={styles.addCartText}>Add WishList</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    addCart: {
      alignItems: "center",
      backgroundColor: "#33c37d",
      alignItems: "center",
      padding: 5,
      borderRadius: 5,
    },
    addCartText: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
    },
  });
  
  export default wishListButton;
  
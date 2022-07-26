import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { cartCreate } from "../../Redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

let cartEnStorage = [];

const removeLocalCart = async (value) => {
  // primero ver si hay algo en el LocalStorage y guardarlo en formato array
  try {
    const jsonStorageCart = await AsyncStorage.getItem("storageCart");
    let storageCart = JSON.parse(jsonStorageCart)
    if (storageCart) {
      cartEnStorage = storageCart
    }
  } catch (error) {
    console.log("error");
  }
  // ahora updatear el localstorage carrito con el nuevo item.
  cartEnStorage.push(value)
  try {
    const jsonValue = JSON.stringify(cartEnStorage);
    await AsyncStorage.setItem("storageCart", jsonValue);
  } catch (error) {
    console.log(error);
  }
};


const CartRemove = (props) => {
  const dispatch = useDispatch();
  const { navigation, item } = props;

  const removeCart = (data) => {
    const itemCart = {
      article: data.name,
      detail: data.detail,
      id: data.id,
      quantity: 1,
      price: data.price,
      img: data.img,
      offer: data.offer,
    };   
    removeLocalCart(data)
    dispatch(cartCreate(itemCart));
  };

  return (
    <TouchableOpacity
      onPress={() => removeCart(item)}
      style={styles.addCart}
    >
      <Text style={styles.removeCartText}>Remove</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addCart: {
    alignItems: "center",
    backgroundColor: "#d51111",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  removeCartText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default CartRemove;
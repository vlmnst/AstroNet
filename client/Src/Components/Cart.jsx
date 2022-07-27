import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cartCreate } from "../../Redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

let cartEnStorage = [];

const updateLocalCart = async (value) => {
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

const Cart = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  const infoCart = useSelector((state) => state.ALL_PRODUCTS.cart);
  
  const onClickAddCart = (data) => {

    let find = infoCart.find(obj => obj.id === data.id)
    if(find){
      alert("This item is allready on your cart")
    } else {
      const itemCart = {
        article: data.name,
        detail: data.detail,
        id: data.id,
        quantity: 1,
        price: data.price,
        img: data.img,
        offer: data.offer,
        stock: data.stock
      };
      updateLocalCart(itemCart)
      dispatch(cartCreate(itemCart));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onClickAddCart(item)}
      style={styles.addCart}
    >
      <Text style={styles.addCartText}>Add Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addCart: {
    alignItems: "center",
    backgroundColor: "#4A347F",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    width:'50%',
    height:'40%',
    justifyContent:"center"
  },
  addCartText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default Cart;


import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
//import { Icon } from "react-native-vector-icons/Icon";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { cartCreate } from '../../Redux/Slice';


const Cart = (props) => {

  const dispatch = useDispatch();
  const { navigation, item } = props;
  const [cart, setCart] = useState([]);
  
  const infoCart = useSelector((state)=>state.ALL_PRODUCTS.cart)

  const onClickAddCart = (data) => {
    //console.log(data);
    const itemCart = {
    article: data.name,
    description: data.description.Description,
    id: data.id,
    quantity: 1,
    price: data.price,
    image: data.img
    }
    //setCart((item)=>item.concat(itemCart));
    //infoCart.concat(itemCart);
    //var arr = [itemCart]
    dispatch(cartCreate(itemCart));
  }
  
    return (
        <TouchableOpacity  onPress={()=> onClickAddCart(item)} style={styles.addCart}>
        <Text style={styles.addCartText}>Add cart</Text>
        </TouchableOpacity>  
    )
}

const  styles = StyleSheet.create({
    addCart: {
        alignItems:'center',
        backgroundColor:"#33c37d",
        alignItems:'center',
        padding: 5,
        borderRadius: 5
      },
      addCartText: {
        fontSize:15,
        color:"white",
        fontWeight:"bold"
      }
})

export default Cart;
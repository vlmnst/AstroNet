import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  getAllProducts,
  getByPrice,
  getProductsByCategory,
  clearCache,
  getProductsByName,
  setpaginateProducts,
  setPageScrollinf,
} from "../../Redux/Slice";
import ProductCard from "./ProductCard.jsx";
import DropDownPicker from "react-native-dropdown-picker";

import Paginate from "./Paginate";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Allproducts = ({ route, navigation }) => {
  // ---------- dispatch ----------
  // si route.params existe en categories, busco por categoria
  // const [searchName, setsearchName] = useState(route.params);
  let searchName = route.params;
  const dispatch = useDispatch();
  // ---------- global states ----------
  let products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
  // let userRole = useSelector((state) => state.USER.role);
  let paginate = useSelector((state) => state.ALL_PRODUCTS.pageScrollinf);
  let paginateProducts = useSelector((state) => state.ALL_PRODUCTS.paginateProductsScrollinf)
  let [categories ] = useState(
    useSelector((state) => state.ALL_PRODUCTS.categories)
  );
  
  // ---------- pickerUtils ----------
  const [openitems, setOpenitems] = useState(false);
  const [valueitems, setValueitems] = useState(searchName);

  const [openprice, setOpenprice] = useState(false);
  const [valueprice, setValueprice] = useState(null);

  let pickerSort = [
    { label: "higher", value: "higher" },
    { label: "lower", value: "lower" },
  ];
  let pickerItems = [];
  categories.length
    ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
    : null;


  useEffect(() => {
    if (searchName !== undefined){
      categories.includes(searchName)
      ? dispatch(getProductsByCategory(searchName))
      : dispatch(getProductsByName(searchName));
    }else{
      dispatch(getAllProducts())
    }
    dispatch(setpaginateProducts([])),
    dispatch(setPageScrollinf(1))
  }, [dispatch]);

  //update
  useEffect(() => {
    loadMoreItem();
  }, [products]);

  // unmount
  useEffect(() => {
    return () => {
      dispatch(clearCache())
      dispatch(setpaginateProducts([]))
      dispatch(setPageScrollinf(0))
    }
  }, [dispatch]);



  // ---------- paginate ----------
  const productsPerPage = 6;

  const indexOfLast = paginate * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const nextPage = () => {
    if (products?.length > 1) {
      dispatch(setpaginateProducts([
        ...paginateProducts,
        ...products.slice(indexOfFirst, indexOfLast),
      ]));
    }
  };

  // ---------- handlers ----------

  function handleCategory(e) {
    dispatch(setpaginateProducts([])),
    dispatch(setPageScrollinf(1)),
    dispatch(getProductsByCategory(e.value));
  }

  function handlePrice(e) {
    dispatch(getByPrice(e.value));
    dispatch(setPageScrollinf(1))
  }

  // ------------ LOADER ----------
  const [isLoading, setIsLoading] = useState(true);

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
      dispatch(setPageScrollinf(paginate+1))
      nextPage();
      products.length === paginateProducts.length
        ? setIsLoading(false)
        : setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.SB}>
        <SearchBar navigation={navigation} route={route} />
      </View>
      {/* ------------ TITLE ------------ */}
      {/* <Text style={styles.title}>{searchName}</Text> *MEJOR QUE NO FUNCIONE A QUE FUNCIONE MAL /}
      {/* ------------ FILTERS ------------ */}
      <View style={styles.selectsContainer}>
        {/* ------------Select category------------- */}
        <View style={styles.selects}>
          <View>
            <Text>Filter by: </Text>
          </View>
          <DropDownPicker
            open={openitems}
            value={valueitems}
            items={pickerItems}
            setOpen={setOpenitems}
            setValue={setValueitems}
            onSelectItem={(value) => handleCategory(value)}
          />
        </View>

        {/* ------------order By Price------------- */}
        <View style={styles.selects}>
          <View>
            <Text>Order by: </Text>
          </View>
          <DropDownPicker
            open={openprice}
            value={valueprice}
            items={pickerSort}
            setOpen={setOpenprice}
            setValue={setValueprice}
            onSelectItem={(value) => handlePrice(value)}
          />
        </View>
      </View>
      {products.error ? (
        <View>
          <Text>{products.error}</Text>
          <Image source={{ uri: 'https://www.rubba-seal.co.uk/themes/rubbaseal/resources/img/roof-bot-confused.png'}} style={styles.notfound}/>
        </View>
      ) : (
        <View style={styles.flatListContainer}>

          {/* ------------ PRODUCTS CARDS ------------ */}
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            style={styles.flatList}
            numColumns={2}
            data={paginateProducts}
            onEndReachedThreshold={0.2}
            onEndReached={() => loadMoreItem()}
            ListFooterComponent={renderLoader}
            renderItem={({ item }) => (
                <View>
                  <ProductCard navigation={navigation} item={item} />
                </View>)
            }
          />

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: 'white',
  },
  SB: {
    height:'12%',
    backgroundColor:'#4A347F',
    width: '100%',
    marginBottom: 20
  },
  selectsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selects: {
    flexDirection: "column",
    margin: 10,
    width: "40%",
  },
  flatListContainer: {
    height:'76%',
  },
  flatList: {
    width: "100%",
    height: '100%',
    marginBottom:'1%'
  },
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  notfound: {
    width: 200,
    height:300,
    alignItems: 'center',
    marginTop: 20,
  }
});

export default Allproducts;
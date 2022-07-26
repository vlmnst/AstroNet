import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, Image, Button, Modal, TouchableOpacity, TextInput } from "react-native";
import IconIonicons from 'react-native-vector-icons/Ionicons';

// reducer actions
import { getPurchaseProducts, putReviewToProduct } from "../../Redux/Slice/userSlice";

const DoReview = ({ route, navigation }) => {

    // local state
    const noStarImg = require('../../assets/reviews/no-star.png');
    const starImg = require('../../assets/reviews/star.png');
    const [starState, setStarState] = useState({
        one: noStarImg,
        two: noStarImg,
        three: noStarImg,
        four: noStarImg,
        five: noStarImg,
    });

    // reducer state
    const dispatch = useDispatch();
    let purchaseProducts = useSelector((state) => state.USER.purchaseProducts);
    let user = useSelector(state => state.USER.userName);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [productForReview, setProductForReview] = useState({
        id: null,
    });

    // review state
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();

    // mount
    useEffect(() => {
        dispatch(getPurchaseProducts(user))
    }, []);

    // manejo estrellas presionadas
    function handleStarsReview(number) {
        setRating(number)

        switch (number) {
            case 1:
                setStarState({ one: starImg, two: noStarImg, three: noStarImg, four: noStarImg, five: noStarImg });
                break;
            case 2:
                setStarState({ one: starImg, two: starImg, three: noStarImg, four: noStarImg, five: noStarImg });
                break;
            case 3:
                setStarState({ one: starImg, two: starImg, three: starImg, four: noStarImg, five: noStarImg });
                break;
            case 4:
                setStarState({ one: starImg, two: starImg, three: starImg, four: starImg, five: noStarImg });
                break;
            case 5:
                setStarState({ one: starImg, two: starImg, three: starImg, four: starImg, five: starImg });
                break;
            default:
                break;
        };
    };

    // seteo el estado local con los datos del producto y abro el modal
    function handleModalReview(item) {
        setModalOpen(true);
        setProductForReview({
            id: item.id,
        });
    };

    // cancelo review
    function handleCancelationReview() {
        setProductForReview({
            id: null,
        })
        setDescription(undefined);
        setRating(undefined);
        setStarState({ one: noStarImg, two: noStarImg, three: noStarImg, four: noStarImg, five: noStarImg });
        setModalOpen(false);
    };

    // confirmo review y despacho
    function handleConfirmationReview() {
        if (description !== undefined && rating !== undefined) {
            const payload = {
                username: user,
                idProduct: productForReview.id, 
                review: {
                    rating,
                    comment: description,
                    owner: user,
                }
            };
            dispatch(putReviewToProduct(payload));
            handleCancelationReview();
        } else {
            alert('Leave a comment');
        };
    };


    return (
        <View style={styles.container}>
            {/* ------------ TITLE ------------ */}
            <View style={styles.SBcontainer}>
				<View style={styles.SB}>
                    <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Purchase products</Text>
				</View>
			</View>
            {/* <Text style={styles.title}>Purchase products</Text> */}

            {/* ------------ PURCHASED PRODUCTS ------------ */}
            <FlatList
                style={styles.flatList}
                numColumns={1}
                data={purchaseProducts}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.cards}>
                        <Image source={{ uri: item.img[0] }} style={styles.image} />
                        <View style={styles.contentCards}>
                            <Text style={styles.names}>{item.name.slice(0,25)}...</Text>

                            { (item.review === false)
                                ? <Button style={styles.btn} disabled={false} title="Review" onPress={() => handleModalReview(item)} />
                                : <Button style={styles.btn} disabled={true} title="DONE" />
                            }
                        </View>
                    </View>
                )}
            />

            {/* ------------ MODAL REVIEW ------------ */}
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Modal transparent visible={modalOpen}>
                    <View style={styles.modalBackground}>

                        {/* STARS RATING */}
                        {/* <TouchableOpacity style={{direction: 'flex', flexDirection: 'row', marginBottom: 5}}> */}
                        <View style={{direction: 'flex', flexDirection: 'row', marginBottom: 5}}>
                            <TouchableOpacity onPress={() => handleStarsReview(1)}>
                                <Image  source={starState.one} style={{height: 30, width: 30}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStarsReview(2)}>
                                <Image  source={starState.two} style={{height: 30, width: 30}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStarsReview(3)}>
                                <Image  source={starState.three} style={{height: 30, width: 30}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStarsReview(4)}>
                                <Image  source={starState.four} style={{height: 30, width: 30}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStarsReview(5)}>
                                <Image  source={starState.five} style={{height: 30, width: 30}} />
                            </TouchableOpacity>
                        </View>
                    
                        {/* DESCRIPTION RATING */}
                        <View style={styles.modalContainer}>
                            <TextInput
                                multiline={true}
                                style={styles.input}
                                placeholder='Leave a comment about the product'
                                onChangeText={text => setDescription(text)}
                                value={description || ''}
                            />
                        </View>

                        {/* BUTTONS */}
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <Button title='CANCEL' onPress={() => handleCancelationReview()} />
                            <Button title='DONE' onPress={() => handleConfirmationReview()} />
                        </View>
                        
                    </View>
                </Modal>
            </View>

        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        // alignItems: "center",
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        // backgroundColor:'white',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    flatList: {
        marginTop: 0,
        padding: 0,
        width: "100%",
    },
    cards: {
        display: 'flex',
        flexDirection: 'row',
        margin: 4,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
    contentCards: {
        // backgroundColor: 'red',
        width: '45%',
        padding: 10,
        // marginRight: 13,
    },
    btn: {
        width: 30,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    names: {
        fontSize: 15,
        textAlign: 'center',
    },
    image: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'grey',
        height: 100,
        width: "50%",
        borderRadius: 10,
        resizeMode : 'contain',
      },
});

export default DoReview;
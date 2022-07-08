import React from "react";
import { Button, View } from "react-native";

const Paginate = (props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.products / props.productsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <View>
            {/* BOTON PREVIUS */}
            {props.currentPage === pageNumbers[1]
                ? <Button title='prev' disabled={false} onPress={() => props.setPage(props.currentPage - 1)} />
                : <Button title='prev' disabled={true} onPress={() => props.setPage(props.currentPage - 1)} />
            }

            {/* PAGINADO */}
            {pageNumbers?.map(number => 
                <Button title={number.toString()} key={number} onPress={() => props.setPage(number)} />
            )}
            
            {/* BOTON NEXT */}
            {props.currentPage === pageNumbers[pageNumbers.length - 1] 
                ? <Button title='next' disabled={true} onPress={() => props.setPage(props.currentPage + 1)} />
                : <Button title='next' disabled={false} onPress={() => props.setPage(props.currentPage + 1)} />
            }
        </View>
    );
};

export default Paginate;
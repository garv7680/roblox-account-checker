import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";

const ListOfUsers = ({ items, isFav }) => {
    const [image, setImage] = useState("placeholder");
    const imageHandler = () => {
        if (isFav) {
            setImage(items.avatar);
        } else {
            setImage(items.image);
        }
    };

    useEffect(imageHandler);
    return (
        <View style={styles.imgCont}>
            <Image
                style={styles.image}
                source={{
                    uri: image,
                }}
            ></Image>
            <Text style={styles.infoText}>Name: {items.name}</Text>
            <Text style={styles.infoText}>ID: {items.id}</Text>
        </View>
    );
};

export default ListOfUsers;
const styles = StyleSheet.create({
    infoText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 100,
    },
    imgCont: {
        backgroundColor: "rgba(236, 236, 236, 0.8)",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: 260,
        height: 150,
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
});

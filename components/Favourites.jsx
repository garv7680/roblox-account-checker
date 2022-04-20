import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Favourites({ setListOfFav, listOfFav }) {
    const navigate = useNavigate();

    const getFavs = async () => {
        try {
            const data = await AsyncStorage.getItem("addedName");
            var o = JSON.parse(data);
            setListOfFav(o);

            navigate("/favourites");
        } catch (err) {
            return <Text>{err}</Text>;
        }
    };
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={getFavs}>
                <Text style={{ fontSize: 20 }}>Favourites</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Favourites;

const styles = StyleSheet.create({
    view: {
        marginTop: 70,
        alignItems: "center",
    },
    button: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFC46C",
        width: 113,
        height: 40,
    },
});

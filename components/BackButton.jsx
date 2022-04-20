import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

function BackButton() {
    const navigate = useNavigate();
    return (
        <View style={styles.view}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigate("/");
                }}
            >
                <Text style={{ fontSize: 20 }}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    view: {
        marginTop: 20,
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

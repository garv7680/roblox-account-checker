import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
function SearchBar({ searchUser, user, setUser }) {
    return (
        <View style={{ alignItems: "center" }}>
            <TextInput
                style={styles.searchBox}
                onChangeText={(e) => {
                    setUser(e);
                }}
                value={String(user)}
                placeholder='Search'
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={searchUser}>
                <Text style={{ fontSize: 20 }}>SEARCH</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBox: {
        borderRadius: 3,
        height: 35,
        width: 285,
        fontSize: 20,
        borderWidth: 0.5,
        backgroundColor: "#F3F0F0",
        marginBottom: 20,
    },
    buttonStyle: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFC46C",
        width: 113,
        height: 40,
    },
});

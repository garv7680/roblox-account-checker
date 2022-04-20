import React from "react";
import SearchBar from "../components/SearchBar";
import { StyleSheet, Text, View } from "react-native";
import {
    useFonts,
    Geo_400Regular,
    Geo_400Regular_Italic,
} from "@expo-google-fonts/geo";
import AppLoading from "expo-app-loading";

function Home({ searchUser, setUser, user }) {
    let [fonts, err] = useFonts({
        Geo_400Regular,
        Geo_400Regular_Italic,
    });

    if (!fonts) {
        return <AppLoading />;
    }
    return (
        <View style={styles.wholePage}>
            <Text style={styles.topText}>Roblox User Account Checker</Text>
            <SearchBar searchUser={searchUser} user={user} setUser={setUser} />
        </View>
    );
}
export default Home;

const styles = StyleSheet.create({
    wholePage: {
        alignItems: "center",
        justifyContent: "center",
    },
    topText: {
        fontFamily: "Geo_400Regular",
        lineHeight: 40,
        width: 285,
        height: 130,
        fontSize: 36,
        textAlign: "center",
        color: "black",
    },
});

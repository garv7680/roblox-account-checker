import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import Pages from "./pages/Pages";
import Favourites from "./components/Favourites";
import { useState } from "react";

function App() {
    const [listOfFav, setListOfFav] = useState([]);

    return (
        <NativeRouter>
            <View>
                <Favourites setListOfFav={setListOfFav} listOfFav={listOfFav} />
            </View>
            <View style={styles.container}>
                <Pages listOfFav={listOfFav} setListOfFav={setListOfFav} />
                <StatusBar style='auto' />
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;

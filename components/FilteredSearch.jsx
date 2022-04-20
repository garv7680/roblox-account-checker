import { StyleSheet, View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FilteredSearch = ({ setListOfFav }) => {
    const searchHandle = async (e) => {
        var getItemsStr = await AsyncStorage.getItem("addedName");
        var getItemsJson = JSON.parse(getItemsStr);
        try {
            var res = getItemsJson.filter((searchedFav) =>
                searchedFav.name.toLowerCase().includes(e)
            );

            if (e == "") {
                setListOfFav(getItemsJson);
            }
            if (res.length !== 0) {
                setListOfFav(res);
            } else {
                setListOfFav([
                    {
                        id: "not found",
                        name: "not found",
                        avatar: "not found",
                    },
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View>
            <TextInput
                style={styles.searchBox}
                placeholder='Search...'
                onChangeText={searchHandle}
                textAlign='center'
            />
        </View>
    );
};

export default FilteredSearch;

const styles = StyleSheet.create({
    searchBox: {
        alignSelf: "center",
        borderRadius: 3,
        height: 35,
        width: 285,
        fontSize: 20,
        borderWidth: 0.5,
        backgroundColor: "#F3F0F0",
        marginBottom: 20,
    },
});

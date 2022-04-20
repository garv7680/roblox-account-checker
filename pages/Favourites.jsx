import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import BackButton from "../components/BackButton";
import ListOfUsers from "../components/ListOfUsers";
import FilteredSearch from "../components/FilteredSearch";

const Favourites = ({ listOfFav, setListOfFav, setUser, setData }) => {
    const deleteFav = (fav) => () => {
        Alert.alert(
            "Delete item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            var filtered = listOfFav.filter((f) => {
                                return f.id !== fav.id;
                            });
                            await AsyncStorage.setItem(
                                "addedName",
                                JSON.stringify(filtered)
                            );
                            setListOfFav(filtered);
                        } catch (err) {
                            console.log(err);
                        }
                    },
                },
                {
                    text: "Cancel",
                },
            ]
        );
    };
    {
        try {
            if (listOfFav.length !== 0) {
                return (
                    <View
                        style={{
                            flex: 1,
                            marginBottom: 50,
                            borderRadius: 10,
                            backgroundColor: "rgba(253, 253, 253, 0.5)",
                        }}
                    >
                        <FilteredSearch
                            listOfFav={listOfFav}
                            setListOfFav={setListOfFav}
                        />
                        <Text style={{ alignSelf: "center" }}>
                            Hold item to delete
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {listOfFav.map((fav) => {
                                return (
                                    <View key={fav.id}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setUser(fav.id);
                                                setData(fav.id);
                                            }}
                                            onLongPress={deleteFav(fav)}
                                        >
                                            <ListOfUsers
                                                items={fav}
                                                isFav={true}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <BackButton />
                    </View>
                );
            } else {
                return (
                    <View>
                        <Text>List is empty :(</Text>
                        <BackButton />
                    </View>
                );
            }
        } catch (err) {
            return (
                <View>
                    <Text>List is empty :(</Text>
                    <BackButton />
                </View>
            );
        }
    }
};

export default Favourites;

import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import BackButton from "../components/BackButton";
import ListOfUsers from "../components/ListOfUsers";

function SearchedName({ listOfusers, setUser, setData }) {
    return (
        <View
            style={{
                flex: 1,

                marginBottom: 30,
                borderRadius: 10,
                backgroundColor: "rgba(253, 253, 253, 0.5)",
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {listOfusers.map((items) => {
                    return (
                        <View key={items.id}>
                            <TouchableOpacity
                                onPress={() => {
                                    setUser(items.id);
                                    setData(items.id);
                                }}
                            >
                                <ListOfUsers items={items} isFav={false} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
            <BackButton />
        </View>
    );
}

export default SearchedName;

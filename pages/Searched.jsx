import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";

function Searched({ name, lastOnline, user, avatar, setAvatar, addToFav }) {
    var fontsize = 20;

    const headShot = async () => {
        await axios
            .get(`https://robloxthumbnailapi.garvitsharma11.repl.co/${user}`)
            .then((res) => {
                setAvatar(res.data.imageUrl);
            });
    };
    const fullBody = async () => {
        await axios
            .get(
                `https://robloxthumbnailapi.garvitsharma11.repl.co/getBodyShot/${user}`
            )
            .then((res) => {
                setAvatar(res.data.imageUrl);
            });
    };

    return (
        <View style={styles.main}>
            <View
                style={{
                    width: 234,
                    height: 80,
                    margin: -40,
                    position: "absolute",
                }}
            >
                <TouchableOpacity
                    style={{
                        zIndex: 100,
                    }}
                    onPress={addToFav}
                >
                    <View>
                        <View
                            style={{
                                justifyContent: "center",
                                backgroundColor: "rgba(254, 109, 138, 0.9)",
                                width: 80,
                                height: 80,
                                borderRadius: 100,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Add to Favourites
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.image}
                source={{
                    uri: avatar,
                }}
            />
            <View style={styles.bcontainer}>
                <TouchableOpacity style={styles.to} onPress={fullBody}>
                    <Text style={{ fontSize: 15 }}>Full Body</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.to} onPress={headShot}>
                    <Text style={{ fontSize: 15 }}>Head Shot</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: fontsize, fontWeight: "bold" }}>
                    User ID: {user}
                </Text>
                <Text style={{ fontSize: fontsize, fontWeight: "bold" }}>
                    Name: {name}
                </Text>
                <Text style={{ fontSize: fontsize, fontWeight: "bold" }}>
                    Last online: {lastOnline}
                </Text>
            </View>
            <BackButton />
        </View>
    );
}

const styles = StyleSheet.create({
    to: {
        backgroundColor: "#FFC46C",
        paddingRight: 20,
        paddingLeft: 20,

        paddingBottom: 5,
        margin: 10,
    },
    image: {
        zIndex: -1,
        width: 234,
        height: 234,
    },
    main: {
        alignItems: "center",
    },
    bcontainer: {
        width: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Searched;

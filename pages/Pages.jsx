import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useNavigate, Routes, Route } from "react-router-native";
import Home from "./Home";
import Searched from "./Searched";
import SearchedName from "./SearchedName";
import axios from "axios";
import Favourites from "./Favourites";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Pages({ listOfFav, setListOfFav }) {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [lastOnline, setLastOnline] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");

    const [listOfusers, setListOfusers] = useState([]);
    const navigate = useNavigate();

    const addToFav = async () => {
        if (listOfFav === null) {
            setListOfFav([{ id: user, name: name, avatar: avatar }]);
            await AsyncStorage.setItem(
                "addedName",
                JSON.stringify([{ id: user, name: name, avatar: avatar }])
            );
            Alert.alert(
                "Added",
                "User has been added to your favourites list",
                [
                    {
                        text: "Ok",
                        style: "cancel",
                    },
                ]
            );
        } else {
            //look through array and if id is == id user searched for
            // show this
            if (listOfFav.some((u) => u.id === user)) {
                Alert.alert("Error", "User is already in favourites list", [
                    {
                        text: "Ok",
                        style: "cancel",
                    },
                ]);
            } else {
                //else set the appropriate values
                try {
                    setListOfFav([
                        ...listOfFav,
                        { id: user, name: name, avatar: avatar },
                    ]);
                    await AsyncStorage.setItem(
                        "addedName",
                        JSON.stringify([
                            ...listOfFav,
                            { id: user, name: name, avatar: avatar },
                        ])
                    );
                    Alert.alert(
                        "Added",
                        "User has been added to your favourites list",
                        [
                            {
                                text: "Ok",
                                style: "cancel",
                            },
                        ]
                    );
                } catch (err) {
                    return <Text>{err}</Text>;
                }
            }
        }
    };

    const setData = async (user) => {
        var [first, second, third] = await Promise.all([
            axios.get(`https://api.roblox.com/users/${user}`),
            axios.get(`https://api.roblox.com/users/${user}/onlinestatus`),
            axios.get(
                `https://robloxthumbnailapi.garvitsharma11.repl.co/${user}`
            ),
        ]).catch((err) => {
            Alert.alert("Error", "Cannot find user account", [
                { text: "Ok", style: "cancel" },
            ]);
        });
        setName(first.data.Username);
        //id displayed there
        var DateLastOnline = second.data.LastOnline.split("T", 1);
        setLastOnline(DateLastOnline);

        setAvatar(third.data.imageUrl);
        //nav to Searched.jsx
        navigate(`/${user}`);
    };
    const searchUser = async () => {
        if (!isNaN(user)) {
            setData(user);
        } else {
            await axios
                .get(
                    `https://robloxthumbnailapi.garvitsharma11.repl.co/search/${user}`
                )
                .then((res) => {
                    //was having problems using res object to get specific data from array
                    //Works after converting to string then back to object
                    const obj = JSON.stringify(res.data);
                    const objJson = JSON.parse(obj);
                    setListOfusers(objJson.data);

                    navigate(`/name/${user}`);
                })
                .catch((err) => {
                    Alert.alert(
                        "Error",
                        `Unexpected Error Occured, {More detail: ${err}`,
                        [{ text: "Ok", style: "cancel" }]
                    );
                });
        }
    };

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Home
                        setUser={setUser}
                        setName={setName}
                        setLastOnline={setLastOnline}
                        setError={setError}
                        setAvatar={setAvatar}
                        user={user}
                        searchUser={searchUser}
                    />
                }
            />
            <Route
                path='/:searchedUser'
                element={
                    <Searched
                        name={name}
                        avatar={avatar}
                        lastOnline={lastOnline}
                        user={user}
                        setAvatar={setAvatar}
                        addToFav={addToFav}
                    />
                }
            />
            <Route
                path='/name/:searchedName'
                element={
                    <SearchedName
                        listOfusers={listOfusers}
                        setUser={setUser}
                        setData={setData}
                    />
                }
            />
            <Route
                path='/favourites'
                element={
                    <Favourites
                        listOfFav={listOfFav}
                        setListOfFav={setListOfFav}
                        setUser={setUser}
                        setData={setData}
                    />
                }
            />
        </Routes>
    );
}

export default Pages;

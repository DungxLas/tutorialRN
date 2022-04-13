// import React, { Component } from 'react';
// import {
//     AppRegistry,
//     Image,
//     FlatList,
//     StyleSheet,
//     Text,
//     View,
//     Alert,
//     Platform,
//     TouchableHighlight,
// } from 'react-native';

const apiGetAllFood = 'https://my-json-server.typicode.com/DungxLas/food_data/db';
async function getFoodsFromServer() {
    try {
        let response = await fetch(apiGetAllFood);
        let responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}

export { getFoodsFromServer };
import React from 'react';
import { NativeModules, Platform } from 'react-native';
const invariant = require('invariant');

const RNNativeFetchIOS = NativeModules.RNNativeFetchIOS;
const RNNativeFetchAndroid = NativeModules.RNNativeFetchAndroid;

import netConstants from './constants';
let RNNativeFetch;

if (Platform.OS === 'ios') {
    invariant(RNNativeFetchIOS, 'react-native-net-request: Add RNNativeFetchIOS.h and RNNativeFetchIOS.m to your Xcode project');
    RNNativeFetch = RNNativeFetchIOS;
} else if (Platform.OS === 'android') {
    invariant(RNNativeFetchAndroid, 'react-native-net-request: Import libraries to android "react-native link react-native-net-request"');
    RNNativeFetch = RNNativeFetchAndroid;
} else {
    invariant(RNNativeFetch, 'react-native-net-request: Invalid platform. This library only supports Android and iOS.'); 
}

module.exports = {
    fetch: (input, init) => {
        return new Promise((resolve, reject) => {
            let request = new Request(input, init);
            //TODO: native module request
        })
    },
    Response: {},
    Request: {},
    Headers: {},
    Body: {}
};

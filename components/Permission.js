import React from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {reqest, PERMISSIONS} from 'react-native-permissions';

const asForPermi = permisson => {
  Request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
    // …
  });
};
const Request = () => {
  return asForPermi();
};

export default Request;

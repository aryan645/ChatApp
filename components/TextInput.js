import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

const TextInputCompnent = ({placeholder, UpdateFields}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[styles.textInput, {fontSize: 17}]}
        placeholder={placeholder}
        onChangeText={text => UpdateFields(text)}
        secureTextEntry={placeholder === 'Enter Password'}
      />
    </View>
  );
};

export default TextInputCompnent;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    width: '85%',
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

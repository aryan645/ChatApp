import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import TextInputCompnent from '../components/TextInput';
import SingUpUser from '../firebase/SignupUsers';
import Firebase from '../firebase/firebaseconfig';
import Adduser from '../firebase/UsersFirebase';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleOnPress = async () => {
    try {
      await SingUpUser(Email, Password);

      console.log('auths');
      const userUID = Firebase.auth().currentUser.uid;
      Adduser(name, Email, '', userUID)
        .then(() => {
          Alert.alert('Success', 'User registered successfully!', [
            {text: 'OK', onPress: () => navigation.navigate('Login')}, // Navigate back to Login
          ]);
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInputCompnent
        placeholder="Enter Name"
        UpdateFields={text => setName(text)}
      />
      <TextInputCompnent
        placeholder="Enter Email"
        UpdateFields={text => setEmail(text)}
      />
      <TextInputCompnent
        placeholder="Password"
        UpdateFields={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  button: {
    padding: 10,
    backgroundColor: '#CCCCFF',
    margin: 10,
    borderRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

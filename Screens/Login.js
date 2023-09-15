import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputCompnent from '../components/TextInput';
import LoginUser from '../firebase/LoginUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from '../firebase/firebaseconfig';
import Request from '../components/Permission';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const passwordInputRef = useRef();

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const uuid = await AsyncStorage.getItem('UUID');
  //     if (uuid) {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{name: 'Users'}],
  //       });
  //     }
  //   };
  //   checkUserLoggedIn();
  // }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    await LoginUser(Email, Password)
      .then(async res => {
        const userUID = Firebase.auth().currentUser.uid;
        // console.log(userUID);
        await AsyncStorage.setItem('UUID', userUID.toString());
        // const uuid = await AsyncStorage.getItem('UUID');
        // console.log(uuid);
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Users'}],
        });
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert('Error', err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Entypo name="login" size={50} color="black" />

      <TextInputCompnent
        style={styles.input}
        placeholder="Enter Email"
        UpdateFields={text => setEmail(text)}
      />
      <TextInputCompnent
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        UpdateFields={text => setPassword(text)}
        // ref={passwordInputRef}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>New User? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#40E0D0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginVertical: 10,
  },
  signupText: {
    color: '#40E0D0',
    fontSize: 16,
  },
});

export default Login;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  LogBox,
} from 'react-native';
import Firebase from '../firebase/firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
const Dashboard = ({navigation}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [cureentUserId, setCurrentUid] = useState('');

  useEffect(() => {
    const currentUid = Firebase.auth().currentUser.uid;
    setCurrentUid(currentUid);
    try {
      Firebase.database()
        .ref('/Users/')
        .on('value', snapshot => {
          //   console.log(snapshot.val());
          let users = [];
          snapshot.forEach(element => {
            if (element.val().uuid === currentUid) {
              //   console.log(element.val().uuid);
            } else {
              users.push({
                userName: element.val().name,
                uuid: element.val().uuid,
              });
            }
          });
          setAllUsers(users);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Chat', {
          currentUid: cureentUserId,
          guestUid: item.uuid,
        })
      }>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
    </TouchableOpacity>
  );

  const logout = async () => {
    await Firebase.auth()
      .signOut()
      .then(async () => {
        // await AsyncStorage.removeItem("UUID")
        navigation.reset({
          //replacing the current stack with new one
          index: 0,
          routes: [{name: 'Login'}],
        });
      });
  };

  // const openGallery = () => {
  //   const openCamera = async () => {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     );
  //     console.log(granted);
  //     if (granted === PermissionsAndroid.RESULTS.GANTED) {
  //       ImagePicker.openPicker({
  //         width: 100,
  //         height: 100,
  //         cropping: true,
  //       }).then(image => {
  //         console.log(image);
  //       });
  //     }
  //   };
  // };

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        // ListHeaderComponent={
        //   <View style={styles.userContainer}>
        //     <TouchableOpacity
        //       style={styles.imageContainer}
        //       onPress={() => openGallery()}>
        //       <Image
        //         source={{
        //           uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
        //         }}
        //       />
        //     </TouchableOpacity>
        //     <View>
        //       <Text style={styles.userName}>Name of user</Text>
        //     </View>
        //   </View>
        // }
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  userContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageContainer: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderColor: 'black',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    fontWeight: 'bold',
  },
  userName: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#40E0D0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

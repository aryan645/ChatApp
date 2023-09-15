import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';

import Firebase from '../firebase/firebaseconfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SendMessage, ReceiveMessage} from '../firebase/sendMessage';

const Chat = ({navigation, route}) => {
  const [message, setMessage] = useState('');

  const [allmessages, setAllmessages] = useState([]);
  const {currentUid, guestUid} = route.params;

  useEffect(() => {
    try {
      let messageList = [];
      Firebase.database()
        .ref('messages')
        .child(currentUid)
        .child(guestUid)
        .on('value', snapshot => {
          messageList = [];
          snapshot.forEach(data => {
            const messageData = data.val();
            messageList.push({
              sendBy: messageData.currentUid,
              receiveBy: messageData.guestUid,
              msg: messageData.message,
            });
          });
          setAllmessages(messageList.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentUid, guestUid]);

  const sendMessage = () => {
    if (message) {
      SendMessage(currentUid, guestUid, message)
        .then(() => {
          setMessage('');
        })
        .catch(err => {
          Alert.alert(err);
        });
      ReceiveMessage(currentUid, guestUid, message)
        .then(() => {
          setMessage('');
        })
        .catch(err => {
          Alert.alert(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        style={styles.flatlist}
        data={allmessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={[
              styles.renderingChat,
              {
                alignSelf:
                  currentUid === item.sendBy ? 'flex-start' : 'flex-end',
              },
            ]}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor:
                    currentUid === item.sendBy
                      ? styles.myMessageBox
                      : styles.messageBox,
                },
              ]}>
              <Text
                style={{
                  padding: 7,
                  fontSize: 16,
                  fontWeight: 'bold',
                  margin: 5,
                  color: 'black',
                }}>
                {item.msg}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Message"
          onChangeText={text => setMessage(text)}
          placeholderTextColor="black"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}>
          <FontAwesome name="send" size={24} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome name="camera" size={24} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  flatlist: {
    flex: 1,
    margin: 10,
    marginBottom: 80,
  },

  renderingChat: {
    flexDirection: 'row',
    marginBottom: 10,
    maxWidth: Dimensions.get('window'.width) / 2 + 10,
  },
  messageBox: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  myMessageBox: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'cyan',
  },
  inputText: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    width: '80%',
  },
  sendButton: {
    padding: 10,
  },
});

export default Chat;

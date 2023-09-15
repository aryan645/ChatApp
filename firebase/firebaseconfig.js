import Firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/compat/app';
import auth from 'firebase/compat/auth';
import database from 'firebase/compat/database';

const FirebaseConfig = {
  apiKey: '',
  databaseURL: 'https://chatapp-dd5b7-default-rtdb.firebaseio.com/',
  projectId: 'chatapp-dd5b7',
  appId: '1:433694582364:android:86164aaf1ec9206d6f6899',
};

export default Firebase.initializeApp(FirebaseConfig);

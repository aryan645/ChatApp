import Firebase from './firebaseconfig';

const LoginUser = async (Email, Password) => {
  try {
    return Firebase.auth().signInWithEmailAndPassword(Email, Password);
  } catch (error) {
    return error;
  }
};

export default LoginUser;

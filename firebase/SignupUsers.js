import Firebase from './firebaseconfig';

const SingUpUser = async (Email, Password) => {
  try {
    return Firebase.auth().createUserWithEmailAndPassword(Email, Password);
  } catch (error) {
    return error;
  }
};

export default SingUpUser;

import Firebase from './firebaseconfig';

export const SendMessage = async (currentUid, guestUid, message) => {
  try {
    return await Firebase.database()
      .ref('messages/' + currentUid)
      .child(guestUid)
      .push({
        currentUid: currentUid,
        guestUid: guestUid,
        message: message,
      });
  } catch (error) {
    return error;
  }
};
export const ReceiveMessage = async (currentUid, guestUid, message) => {
  try {
    return await Firebase.database()
      .ref('messages/' + guestUid)
      .child(currentUid)
      .push({
        currentUid: currentUid,
        guestUid: guestUid,
        message: message,
      });
  } catch (error) {
    return error;
  }
};

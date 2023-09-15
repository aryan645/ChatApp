import Firebase from './firebaseconfig';

const Adduser = async (name, Email, image, uuid) => {
  try {
    console.log(name);
    console.log(Email);
    return await Firebase.database()
      .ref('Users/' + uuid)
      .set({
        name: name,
        Email: Email,
        image: image,
        uuid: uuid,
      });
  } catch (error) {
    return error;
  }
};

export default Adduser;

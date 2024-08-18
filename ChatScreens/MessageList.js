//MessageList.js
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState, Fragment } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, Image, FlatList, View, Dimensions } from 'react-native';
import { auth, db } from '../firebaseConfig';

const MessageScreen = ({ navigation, route }) => {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const [notiUsers, setNotiUsers] = useState([]);

  useEffect(() => {
    const getUserContacts = () => {
      const q = query(doc(db, "users", route.params.user_id));
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const contactsObject = snapshot.data().realFriend;
        const contactsSnap = await Promise.all(contactsObject.map((c) => getDoc(doc(db, "users", c))));
        const contactDetails = contactsSnap.map((d) => ({
          uid: d.id, // Ensure this is the user's UID
          ...d.data()
        }));
        setNotiUsers(contactDetails);
      });
    };

    getUserContacts();
  }, [navigation]);

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#F8AF00' }} />
      <View style={{ backgroundColor: '#FFF', flex: 1, alignItems: 'center' }}>
        {/* <Image source={require('../assets/chat_hero.jpg')} style={{ width: imageWidth, height: 270, marginBottom: 15, marginTop: 0 }} /> */}
        <View>
          <FlatList
            data={notiUsers}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { name: item.name, uid: item.uid, avatar: item.avatar })}>
                <View style={styles.card}>
                  <Image style={styles.userImageST} source={{ uri: item.avatar }} />
                  <View style={styles.textArea}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.msgContent}>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Verdana'
  },
  msgContent: {
    paddingTop: 5,
  },
});

export default MessageScreen;

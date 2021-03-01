import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { TweetModel, UserModel } from "../../../../models/main";
import { FeedCell } from "./components/FeedCell.main";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./FeedScreen.styles";
import { TEXT_GRAY, TEXT_PRIMARY } from "../../../../Constants";
import firebase from "firebase/app";
import "firebase/firestore";
import { SearchBar } from "react-native-elements";

/* FeedScreen is the main feed of Tweets. It makes an API request to our 
    backend with whatever algorithm & search queries the user has entered;
    then, it loads the tweets it gets back.

    A couple of notes –

      0. First, to preface this, when we're using Firebase, there are two different
          locations where users are tracked. There's the "Authentication" user object,
          which is created and maintained by Firebase. That object is accessible via:
            
            firebase.auth().currentUser;

          That object only contains a few basic fields, like email/displayName/uid/etc.
          Whenever we need access to the User's UID (unique identifier), we can access
          it using that object:

            const uid = firebase.auth().currentUser.uid;

          There's also the user node in the "users" collection in Firestore, which
          is something that we can choose to create when the user's account is created
          for the first time. This is where we actually store data associated with
          this user, such as (in this app) the algorithm they have currently selected.
          We access this object using an observer on the following reference:

            const userRef = firebase.firestore().collection("users").doc(uid);

            ... proceed to fetch or observe data at userRef using Firestore methods

      1. (First useEffect) 
          On this page, we observe the model corresponding to this user 
          in the "users" collection of Firestore. The only data point we track 
          per user is the algorithm that they've currently selected, so if they open up
          another device & sign in, their algorithm stay in sync across devices. 
          If we see an update to this user object in Firestore, we update the local 
          [user, setUser] state variable.
          
      2. (Second useEffect) 
          Whenever the user's selected algorithm or the search query changes, we want to
          re-query a list of tweets, using the new algorithm and/or search query as our
          parameters. 

*/

export const FeedScreen = ({ navigation }: any) => {
  // Notice how the type of this state variable is either "null" or an array of TweetModel
  const [tweets, setTweets] = useState<TweetModel[] | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingDone, setEditingDone] = useState(0);

  useEffect(() => {
    // Runs once when this component mounts.
    // Gets the current user identifier
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const ref = firebase.firestore().collection("users").doc(currentUser.uid);
      const unsubscribe = ref.onSnapshot((doc) => {
        const document = doc.data();
        if (document) {
          setUser(document as UserModel);
        } else {
          console.log(
            "Unable to get user document - might be a new user. Write to Firebase."
          );
          ref.set({
            algo: "viral",
            subtitle: "Virality",
          });
        }
      });
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    /* This code block runs every time the user's selected algorithm (which lies in the user model)
        or the currently entered search value changes (but only when editing is done, e.g. when
        the user hits "return" after entering a search query).
    
        What exactly is going on here? We're making a POST Request to a backend that we've
        set up (aside: it's a Firebase Cloud Function!).

        This API endpoint takes in an algorithm and a keyword, and returns a list of tweets that
        we can then dispaly to this user. We can think of it like a black box, where we give it 
        some well-defined inputs & expect some results.
        
        Notice how the call to fetch() returns a promise, which we resolve using .then() and .catch()
        syntax. 
    */
    if (user) {
      setLoading(true);
      // change to localhost:5000 for testing
      fetch("http://192.168.86.28:5000/query_tweets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algo: user.algo, keyword: search }),
      })
        .then((data) => data.json())
        .then((data) => {
          // At this point, the network request has finished, and we can handle
          // the object that we received from the backend.
          if (data.error) {
            console.log("ERROR: ", data.error);
          } else {
            setTweets(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          // Something went wrong in the network request, and we should
          // handle that error somehow.
          console.log(error);
          setLoading(false);
        });
    }
  }, [user, editingDone]);

  const renderItem = ({ item }: { item: TweetModel }) => {
    return <FeedCell tweet={item} />;
  };

  const searchBar = () => {
    return (
      <SearchBar
        placeholder="Search..."
        style={{ fontFamily: "Avenir" }}
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "white" }}
        lightTheme={true}
        round={true}
        onChangeText={(text) => setSearch(text)}
        onEndEditing={() => setEditingDone(editingDone + 1)}
        showLoading={loading}
        value={search || ""}
      />
    );
  };

  const HeaderItem = () => {
    return (
      <View>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.headerTitle}>Feed</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.subtitleOne}>Prioritizing </Text>
              <Text style={styles.subtitleTwo}>
                {(user && user.subtitle) || "Virality"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ ...styles.headerRightButton, marginLeft: 5 }}
            onPress={() => navigation.navigate("GalleryStackScreen")}
          >
            <Ionicons
              name="color-wand-outline"
              size={25}
              color={TEXT_PRIMARY}
            />
          </TouchableOpacity>
        </View>
        {searchBar()}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderItem />
      <FlatList
        data={tweets}
        renderItem={renderItem}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => {
          return "item-" + index;
        }}
      />
    </SafeAreaView>
  );
};

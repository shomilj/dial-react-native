import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { TweetModel, UserModel } from "../models/main";
import { FeedCell } from "./FeedCell";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./FeedScreen.styles";
import { TEXT_GRAY, TEXT_PRIMARY } from "../Constants";
import firebase from "firebase/app";
import "firebase/firestore";
import { SearchBar } from "react-native-elements";

export const FeedScreen = ({ navigation }: any) => {
  const [tweets, setTweets] = useState<[TweetModel] | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("gme");
  const [loading, setLoading] = useState(false);
  const [editingDone, setEditingDone] = useState(0);

  useEffect(() => {
    // Observe the user object & sync it locally.
    // The only thing we store in the user object is the "algo" that they choose.
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
            algo: "virality",
          });
        }
      });
      return unsubscribe;
    }
  }, [setUser]);

  useEffect(() => {
    // For now, populate our tweets with dummy data.
    // In reality, we want to use user.algo & make a POST request.
    if (user) {
      setLoading(true);
      fetch("https://us-central1-dial-000.cloudfunctions.net/query_tweets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algo: "controversial", keyword: search }),
      })
        .then((data) => data.json())
        .then((data) => {
          setTweets(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user, editingDone]);

  const renderItem = ({ item, index }: any) => {
    return <FeedCell tweet={item} />;
  };

  const searchBar = () => {
    if (searchVisible) {
      return (
        <SearchBar
          placeholder="Search..."
          style={{ fontFamily: "Avenir" }}
          containerStyle={{ backgroundColor: "white" }}
          inputContainerStyle={{ backgroundColor: "white" }}
          lightTheme={true}
          round={true}
          onChangeText={setSearch}
          onEndEditing={() => setEditingDone(editingDone + 1)}
          showLoading={loading}
          value={search}
        />
      );
    } else {
      return null;
    }
  };

  const headerItem = () => {
    return (
      <View>
        <View style={styles.headerRow}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/icon.png")}
          />
          <Text style={styles.headerTitle}>Feed</Text>
          <TouchableOpacity
            style={styles.headerRightButton}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <Ionicons name="search-outline" size={25} color={TEXT_PRIMARY} />
          </TouchableOpacity>
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
      {headerItem()}
      <FlatList
        data={tweets}
        renderItem={renderItem}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return "item-" + index;
        }}
      />
    </SafeAreaView>
  );
};

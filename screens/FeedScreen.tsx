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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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
            algo: "viral",
            subtitle: "Virality",
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
      fetch("http://192.168.86.58:5000/query_tweets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algo: user.algo, keyword: search }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) {
            console.log("ERROR: ", data.error);
          } else {
            setTweets(data);
          }
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

  const headerItem = () => {
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

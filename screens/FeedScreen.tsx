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

export const FeedScreen = ({ navigation }: any) => {
  const [tweets, setTweets] = useState<[TweetModel] | null>(null);
  const [doneLoading, setDoneLoading] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);

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
        setDoneLoading(true);
      });
      return unsubscribe;
    }
  }, [setDoneLoading, setUser]);

  useEffect(() => {
    // For now, populate our tweets with dummy data.
    // In reality, we want to use user.algo & make a POST request.
    if (user) {
      const algo = user.algo;
    }
    setTweets(require("../test-data/tweets.json").slice(0, 10));
  }, [user]);

  const renderItem = ({ item, index }: any) => {
    return <FeedCell tweet={item} />;
  };

  const headerItem = () => {
    return (
      <View style={styles.headerRow}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/icon.png")}
        />
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity
          style={styles.headerRightButton}
          onPress={() => navigation.navigate("GalleryStackScreen")}
        >
          <Ionicons name="color-wand-outline" size={25} color={TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={headerItem}
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return "item-" + index;
        }}
      />
    </SafeAreaView>
  );
};

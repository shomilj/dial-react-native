import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { TweetModel } from "../models/main";
import { FeedCell } from "./FeedCell";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./FeedScreen.styles";
import { TEXT_GRAY, TEXT_PRIMARY } from "../Constants";

export const FeedScreen = ({ navigation }: any) => {
  const [tweets, setTweets] = useState<[TweetModel] | null>(null);

  useEffect(() => {
    // For now, populate our tweets with dummy data.
    setTweets(require("../test-data/tweets.json").slice(0, 10));
  }, []);

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
          onPress={() => navigation.navigate("GalleryScreen")}
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

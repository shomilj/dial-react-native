import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, View, Text, Image } from "react-native";
import { TEXT_GRAY } from "../Constants";
import { TweetModel } from "../models/main";
import { getTimeAgo } from "../utils/time";
import { styles } from "./FeedCell.styles";

export const FeedCell = ({ tweet }: { tweet: TweetModel }) => {
  const verifiedBadge = () => {
    if (tweet.verified) {
      return (
        <Image
          source={require("../assets/verified.png")}
          style={styles.verifiedBadge}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.profilePic}
        />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <Text style={styles.tweetAuthor}>{tweet.name}</Text>
          {verifiedBadge()}
          <Text style={styles.tweetUsername}>
            {"@" + tweet.username + " • " + getTimeAgo(tweet.created_at)}
          </Text>
        </View>
        <View style={styles.tweetRow}>
          <Text style={styles.tweetText}>{tweet.tweet}</Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.bottomRowItem}>
            <Ionicons
              style={styles.bottomRowText}
              name="chatbox-outline"
              size={20}
              color="#dcdde1"
            />
            <Text style={styles.bottomRowText}>{tweet.nreplies}</Text>
          </View>
          <View style={styles.bottomRowItem}>
            <Ionicons
              style={styles.bottomRowText}
              name="repeat-outline"
              size={20}
              color={TEXT_GRAY}
            />
            <Text style={styles.bottomRowText}>{tweet.nreplies}</Text>
          </View>
          <View style={styles.bottomRowItem}>
            <Ionicons
              style={styles.bottomRowText}
              name="heart-outline"
              size={20}
              color={TEXT_GRAY}
            />
            <Text style={styles.bottomRowText}>{tweet.nreplies}</Text>
          </View>
          <View style={styles.bottomRowItem}>
            <Ionicons
              style={styles.bottomRowText}
              name="share-social-outline"
              size={20}
              color={TEXT_GRAY}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

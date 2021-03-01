import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image } from "react-native";
import { TEXT_GRAY } from "../../../../../Constants";
import { TweetModel } from "../../../../../models/main";
import { getTimeAgo } from "../../../../../utils/time";
import { styles } from "./FeedCell.styles";

/* FeedCell is a single cell in the list of tweets. This component is pretty
    simple - it's just a view structure with several containers that 
    define the cell layout. It takes in a TweetModel as a prop. */
export const FeedCell = ({ tweet }: { tweet: TweetModel }) => {
  const verifiedBadge = () => {
    if (tweet.verified) {
      return (
        <Image
          source={require("../../../../../assets/verified.png")}
          style={styles.verifiedBadge}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <View style={styles.container}>
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
            <Text style={styles.bottomRowText}>{tweet.nretweets}</Text>
          </View>
          <View style={styles.bottomRowItem}>
            <Ionicons
              style={styles.bottomRowText}
              name="heart-outline"
              size={20}
              color={TEXT_GRAY}
            />
            <Text style={styles.bottomRowText}>{tweet.nlikes}</Text>
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

import { StyleSheet } from "react-native";
import { TEXT_GRAY } from "../Constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#dfe6e9",
  },
  leftColumn: {
    flex: 1,
    flexDirection: "row",
    maxWidth: "8%",
    minWidth: "8%",
    marginLeft: 20,
    height: "auto",
    justifyContent: "center",
    alignItems: "baseline",
  },
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  profilePic: {
    marginTop: 5,
    borderRadius: 20,
    height: 45,
    width: 45,
  },

  // Top Row
  topRow: {
    flex: 1,
    flexDirection: "row",
    height: "auto",
    marginVertical: 5,
    marginHorizontal: 10
  },
  tweetAuthor: {
    fontFamily: "Avenir",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 10,
    marginRight: 5,
    lineHeight: 21
  },
  verifiedBadge: {
    height: 10,
    width: 10,
    marginRight: 4,
  },
  tweetUsername: {
    fontFamily: "Avenir",
    fontWeight: "300",
    color: TEXT_GRAY,
    fontSize: 15,
    marginRight: 4,
  },

  // Tweet Content
  tweetRow: {
    flex: 1,
    flexDirection: "row",
    height: "auto",
    marginVertical: 5,
    marginHorizontal: 10
  },
  tweetText: {
    fontFamily: "Avenir",
    fontWeight: "400",
    marginHorizontal: 10,
    fontSize: 16,
    lineHeight: 21
  },

  bottomRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 10
  },
  bottomRowItem: {
    marginHorizontal: 10,
    height: 20,
    flexDirection: "row",
  },
  bottomRowText: {
    marginHorizontal: 3,
    fontFamily: 'Avenir',
    alignSelf: "center",
    color: TEXT_GRAY
  }
});

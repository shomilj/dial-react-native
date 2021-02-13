import { StyleSheet } from "react-native";
import { TEXT_GRAY } from "../Constants";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dfe6e9",
  },
  leftColumn: {
    flex: 1,
    flexDirection: "row",
    maxWidth: "5%",
    minWidth: "5%",
    height: "auto",
    justifyContent: "center",
    alignItems: "baseline",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    paddingRight: 20,
  },
  profilePic: {
    marginTop: 5,
    borderRadius: 20,
    height: 40,
    width: 40,
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
    fontWeight: "300",
    marginHorizontal: 10,
    fontSize: 15,
    lineHeight: 21
  },

  bottomRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10
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

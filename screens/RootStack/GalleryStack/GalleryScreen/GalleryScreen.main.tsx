import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TEXT_DARK_GRAY, TEXT_PRIMARY } from "../../../../Constants";
import {
  AlgoCategoryModel,
  AlgoModel,
  UserModel,
} from "../../../../models/main";
import { styles } from "./GalleryScreen.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase/app";
import "firebase/firestore";

/* GalleryScreen displays a collection of algorithms available to the user
    to choose from, sort of in an "App Store" like gallery view.

    On this page, we observe the user object in Firestore, so that we
    can keep the selected algorithm in sync with whatever value is
    selected in our backend database. This code is quite similar
    to the other places in which we do this throughout our app.

    We also write to Firestore whenever the user selects a new algorithm.
    This write automatically triggers the observer, so we don't need
    to do any additional state manipulation to make sure the new algorithm 
    shows up as "selected" in our UI/UX. Here's what that code (to write 
    to Firestore) looks like:

        firebase.firestore().collection("users").doc(uid).set({
          algo: item.key,
          subtitle: item.subtitle,
        });
        
*/
export const GalleryScreen = ({ navigation }: any) => {
  // The list of algorithms that we use comes from a static data source, but we
  // could easily move this list to Firestore if we wanted to.
  const algorithms = require("../../../../test-data/algorithms.json");

  const [user, setUser] = useState<UserModel | null>(null);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          const document = doc.data();
          if (document) {
            setUser(document as UserModel);
          }
        });
      return unsubscribe;
    }
  }, []);

  const headerItem = () => {
    return (
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Feeds</Text>
        <View style={styles.headerRightButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="home-outline" size={25} color={TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const selectedAlgo = (item: AlgoModel) => {
    // If the user selects an algorithm, update the value
    // in their Firestore user object.
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection("users").doc(currentUser.uid).set({
        algo: item.key,
        subtitle: item.subtitle,
      });
    }
  };

  const renderAlgo = ({ item }: { item: AlgoModel }) => {
    return (
      <TouchableOpacity
        style={styles.algoCell}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("AlgoScreen", { algo: item });
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.algoCellImage}
        ></Image>
        <Text style={styles.algoCellTitle}>{item.title}</Text>
        <Text style={styles.algoCellSubtitle}>23K Installs • 4.6 Stars</Text>
        <TouchableOpacity
          style={styles.algoCellButtonView}
          onPress={() => selectedAlgo(item)}
        >
          <Ionicons
            style={styles.algoCellActivateButton}
            name={
              user?.algo === item.key
                ? "radio-button-on-outline"
                : "radio-button-off-outline"
            }
            size={16}
            color={TEXT_DARK_GRAY}
          />
          <Text style={styles.algoCellActivateText}>
            {user?.algo === item.key ? "Activated" : "Activate"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }: { item: AlgoCategoryModel }) => {
    return (
      <View style={styles.algoCategoryCell}>
        <View style={styles.algoCategoryHeader}>
          <Text style={styles.algoCategoryHeaderLine}>|</Text>
          <Text style={styles.algoCategoryHeaderText}>{item.title}</Text>
        </View>
        <FlatList
          style={styles.algoCategoryList}
          data={item.algorithms}
          horizontal={true}
          renderItem={renderAlgo}
          keyExtractor={(item, index) => {
            return "inner-item-" + index;
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={headerItem()}
        data={algorithms}
        renderItem={renderCategory}
        keyExtractor={(_, index) => {
          return "item-" + index;
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

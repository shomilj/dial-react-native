import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TEXT_DARK_GRAY, TEXT_PRIMARY } from "../../../../Constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./AlgoScreen.styles";
import { AlgoModel, UserModel } from "../../../../models/main";
import firebase from "firebase/app";
import "firebase/firestore";

/* AlgoScreen is the overview page for a specific algorithm. If a user
    taps on an algorithm card on GalleryScreen, it will take them to this
    screen, which contains a more detailed overview of the algorithm. There's also
    a "Select this Algorithm" button at the bottom of this view. 

    Functionally, this component has much of the same logic as GalleryScreen, so take 
    a look at that screen's comment to understand what's going on here. */
export const AlgoScreen = ({ route, navigation }: any) => {
  // This screen is passed an algorithm from the GalleryScreen.
  const { algo }: { algo: AlgoModel } = route.params;

  // The User Block
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
  }, [setUser]);

  const selectedAlgo = (item: AlgoModel) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection("users").doc(currentUser.uid).set({
        algo: item.key,
        subtitle: item.subtitle,
      });
    }
  };

  const HeaderItem = () => {
    return (
      <View style={styles.headerRow}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color={TEXT_DARK_GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderItem />
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: algo.image }} style={styles.image} />
        <View style={styles.textView}>
          <Text style={styles.title}>{algo.title}</Text>
          <Text style={styles.stars}>
            {algo.stars} Stars • {algo.rating} Rating
          </Text>
          <Text style={styles.description}>{algo.description}</Text>
          {/* One interesting thing - note the conditional formatting here using the ternery operator "?" */}
          <TouchableOpacity
            style={
              user?.algo === algo.key
                ? styles.algoCellButtonViewActive
                : styles.algoCellButtonViewNotActive
            }
            onPress={() => selectedAlgo(algo)}
          >
            <Text
              style={
                user?.algo === algo.key
                  ? styles.algoCellActivateTextActive
                  : styles.algoCellActivateTextNotActive
              }
            >
              {user?.algo === algo.key ? "Activated" : "Activate"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TEXT_DARK_GRAY, TEXT_PRIMARY } from "../Constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./AlgoScreen.styles";
import { AlgoModel, UserModel } from "../models/main";
import firebase from "firebase/app";
import "firebase/firestore";

export const AlgoScreen = ({ route, navigation }: any) => {
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
          <TouchableOpacity
            style={user?.algo === algo.key ? styles.algoCellButtonViewActive : styles.algoCellButtonViewNotActive}
            onPress={() => selectedAlgo(algo)}
          >
            <Text style={user?.algo === algo.key ? styles.algoCellActivateTextActive : styles.algoCellActivateTextNotActive}>{user?.algo === algo.key ? "Activated" : "Activate"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

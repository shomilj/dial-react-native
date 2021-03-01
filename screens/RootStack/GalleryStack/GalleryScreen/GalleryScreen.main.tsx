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

export const GalleryScreen = ({ navigation }: any) => {
  const algorithms = require("../../../../test-data/algorithms.json");

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
        keyExtractor={(item, index) => {
          return "item-" + index;
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

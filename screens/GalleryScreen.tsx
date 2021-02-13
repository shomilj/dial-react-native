import React from "react";
import { FlatList, SafeAreaView, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TEXT_GRAY, TEXT_PRIMARY } from "../Constants";
import { AlgoCategoryModel, AlgoModel } from "../models/main";
import { styles } from "./GalleryScreen.styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export const GalleryScreen = ({ navigation }: any) => {
  const algorithms = require("../test-data/algorithms.json");

  const headerItem = () => {
    return (
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Dials</Text>
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

  const renderAlgo = ({ item }: { item: AlgoModel }) => {
    return (
      <TouchableOpacity style={styles.algoCell} activeOpacity={0.9}>
        <Image
          source={{ uri: item.image }}
          style={styles.algoCellImage}
        ></Image>
        <Text style={styles.algoCellTitle}>{item.title}</Text>
        <Text style={styles.algoCellSubtitle}>23K Installs • 4.6 Stars</Text>
        <View style={styles.algoCellButtonView}>
          <Ionicons
            style={styles.algoCellActivateButton}
            name="radio-button-off-outline"
            size={16}
            color={TEXT_PRIMARY}
          />
          <Text style={styles.algoCellActivateText}>Activate</Text>
        </View>
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

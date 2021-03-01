import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GalleryScreen } from "./GalleryScreen/GalleryScreen.main";
import { AlgoScreen } from "./AlgoScreen/AlgoScreen.main";

const GalleryStack = createStackNavigator();

export const GalleryStackScreen = () => {
  return (
    <GalleryStack.Navigator screenOptions={{ headerShown: false }}>
      <GalleryStack.Screen name="GalleryScreen" component={GalleryScreen} />
      <GalleryStack.Screen name="AlgoScreen" component={AlgoScreen} />
    </GalleryStack.Navigator>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GalleryScreen } from "./GalleryScreen";
import { AlgoScreen } from "./AlgoScreen";

const GalleryStack = createStackNavigator();

export const GalleryStackScreen = () => {
  return (
    <GalleryStack.Navigator screenOptions={{ headerShown: false }}>
      <GalleryStack.Screen name="GalleryScreen" component={GalleryScreen} />
      <GalleryStack.Screen name="AlgoScreen" component={AlgoScreen} />
    </GalleryStack.Navigator>
  );
};

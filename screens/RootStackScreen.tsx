import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GalleryScreen } from "./GalleryScreen";
import { MainStackScreen } from "./MainStackScreen";

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainStackScreen" component={MainStackScreen} />
      <RootStack.Screen name="GalleryScreen" component={GalleryScreen} />
    </RootStack.Navigator>
  );
};

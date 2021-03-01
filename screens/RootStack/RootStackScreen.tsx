import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import { GalleryStackScreen } from "./GalleryStack/GalleryStackScreen";

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainStackScreen" component={MainStackScreen} />
      <RootStack.Screen
        name="GalleryStackScreen"
        component={GalleryStackScreen}
      />
    </RootStack.Navigator>
  );
};

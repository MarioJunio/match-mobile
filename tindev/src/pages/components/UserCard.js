import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export function UserCard({ user, zindex }) {
  return (
    <View style={[styles.cardContainer, { zIndex: zindex }]}>
      <Image
        style={styles.avatar}
        source={{
          uri: user.avatar
        }}
      />
      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.bio} numberOfLines={3}>
          {user.bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    alignSelf: "flex-start"
  },
  bio: {
    fontSize: 15,
    marginTop: 10,
    color: "#999",
    lineHeight: 18
  },
  cardContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff"
  }
});

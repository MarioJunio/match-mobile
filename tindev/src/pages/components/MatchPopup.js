import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import itsamatch from "../../assets/itsamatch.png";

export function MatchPopup({ user, onClose }) {
  return (
    <View style={styles.matchContainer}>
      <Image source={itsamatch} style={styles.matchImage} />
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center"
  },
  matchImage: {
    width: 250,
    resizeMode: "contain"
  },
  avatar: {
    marginTop: 20,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 100,
    resizeMode: "contain",
    width: 200,
    height: 200
  },
  name: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    maxWidth: 300
  },
  bio: {
    marginTop: 15,
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    maxWidth: 400,
    textAlign: "center"
  },
  closeButton: {
    padding: 25,
    color: "rgba(255, 255, 255, 0.9)",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold"
  }
});

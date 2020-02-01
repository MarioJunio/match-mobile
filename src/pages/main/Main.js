import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import io from "socket.io-client";

import logo from "../../assets/logo.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";

import api from "../../services/api";

import { UserCard, MatchPopup } from "../components";

export function Main({ navigation }) {
  const userId = navigation.getParam("userId");

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    api
      .get("/devs", {
        headers: {
          userid: userId
        }
      })
      .then(({ data }) => {
        setUsers(data);
      });
  }, [userId]);

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query: {
        user: userId
      }
    });

    socket.on("match", user => {
      setMatchDev(user);
    });
  }, [userId]);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate("Login");
  }

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: {
        user: userId
      }
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: {
        user: userId
      }
    });

    setUsers(rest);
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderLogo()}
      {users.length <= 0 ? emptyMessageRender() : cardsRender()}
      {users.length > 0 ? buttonsLikeAndDislikeRender() : null}
      {matchDev && (
        <MatchPopup user={matchDev} onClose={() => setMatchDev(null)} />
      )}
    </SafeAreaView>
  );

  function renderLogo() {
    return (
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
    );
  }

  function cardsRender() {
    return (
      <View style={styles.cardsContainer}>
        {users.map((user, index) => (
          <UserCard key={index} zindex={users.length - index} user={user} />
        ))}
      </View>
    );
  }

  function buttonsLikeAndDislikeRender() {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleDislike}
          style={[styles.buttonAction, { marginRight: 30 }]}
        >
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLike}
          style={[styles.buttonAction, { marginLeft: 30 }]}
        >
          <Image source={like} />
        </TouchableOpacity>
      </View>
    );
  }

  function emptyMessageRender() {
    return <Text style={styles.emptyText}>Não há mais usuários por perto</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  logo: {
    marginTop: 30
  },
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
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    maxHeight: 500
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
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 40
  },
  buttonAction: {
    width: 55,
    height: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  emptyText: {
    marginBottom: 350,
    fontSize: 18,
    color: "#DF4723",
    fontWeight: "bold"
  }
});

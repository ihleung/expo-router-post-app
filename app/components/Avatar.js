import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Avatar = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch user data from Firebase
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/users.json"
        );
        if (!response.ok) {
          throw new Error("User not found.");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image style={styles.avatar} source={{ uri: user.image }} />
          <Text style={styles.username}>{user.name}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Define a function to fetch the user based on userId
function fetchUser(userId, setUser) {
  fetch("https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/users.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      setUser(userData);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
    });
}

export default function Avatar({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUser(userId, setUser);
    }
  }, [userId]);

  // Render the user's avatar and name
  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={{ uri: userId.image }} style={styles.avatar} />
          <Text style={styles.name}>{userId.name}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

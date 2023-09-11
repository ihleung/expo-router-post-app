import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Define a function to fetch the user based on userId
async function fetchUser(userId, setUser) {
  try {
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/users.json"
    );
    const userData = await response.json();
    setUser(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
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
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
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

import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";

export default function Create() {
  const router = useRouter();
  const [image, setImage] = useState("https://i.imgur.com/X3ctv3i.jpg");
  const [caption, setCaption] = useState("");
  function handleSave() {
    if (caption && image) {
      createPost();
    }
  }

  async function createPost() {
    const createdAt = new Date().getTime();
    const post = {
      caption: caption,
      image: image,
      createdAt: createdAt,
      uid: "fTs84KRoYw5pRZEWCq2Z",
    };
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        body: JSON.stringify(post),
      }
    );
    if (response.ok) {
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create New Post",
          headerLeft: () => (
            <Button
              title="Close"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              title="Create"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={handleSave}
            />
          ),
        }}
      />
      {/* Add Image Component */}
      <Text style={styles.imgText}>Image</Text>
      <Image source={{ uri: image }} style={styles.image} />

      {/* Add TextInput Component */}
      <Text style={styles.imgText}>Caption</Text>
      <TextInput
        placeholder="Enter Caption"
        style={styles.input}
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
    </View>
  );
}

/*
<View style={styles.main}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.subtitle}>Create a new post.</Text>
      </View>
      */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  imgText: {
    fontSize: 25,
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 350, // Adjust the height as needed
    resizeMode: "cover", // You can change the resizeMode as needed
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#264c59",
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
    width: "100%",
  },
});

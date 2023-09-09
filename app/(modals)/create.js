import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Create() {
  const router = useRouter();
  const [image, setImage] = useState(
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  );
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
      <View style={styles.main}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.subtitle}>Create a new post.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
});
